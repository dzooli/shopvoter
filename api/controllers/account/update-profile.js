module.exports = {
  friendlyName: "Update profile",

  description: "Update the profile for the specified user.",

  inputs: {
    id: {
      type: "number",
      required: true,
    },

    fullName: {
      type: "string",
    },

    emailAddress: {
      type: "string",
    },

    companyAdmin: {
      type: "string",
    },
  },

  exits: {
    emailAlreadyInUse: {
      statusCode: 409,
      description: "The provided email address is already in use.",
    },
  },

  fn: async function ({
    id,
    fullName,
    emailAddress,
    companyAdmin
  }) {
    var newEmailAddress = emailAddress;
    if (newEmailAddress !== undefined) {
      newEmailAddress = newEmailAddress.toLowerCase();
    }

    var operatingUser = await User.findOne({id: id});

    // Determine if this request wants to change the current user's email address,
    // revert her pending email address change, modify her pending email address
    // change, or if the email address won't be affected at all.
    var desiredEmailEffect; // ('change-immediately', 'begin-change', 'cancel-pending-change', 'modify-pending-change', or '')
    if (
      newEmailAddress === undefined ||
      (operatingUser.emailStatus !== "change-requested" &&
        newEmailAddress === operatingUser.emailAddress) ||
      (operatingUser.emailStatus === "change-requested" &&
        newEmailAddress === operatingUser.emailChangeCandidate)
    ) {
      desiredEmailEffect = "";
    } else if (
      operatingUser.emailStatus === "change-requested" &&
      newEmailAddress === operatingUser.emailAddress
    ) {
      desiredEmailEffect = "cancel-pending-change";
    } else if (
      operatingUser.emailStatus === "change-requested" &&
      newEmailAddress !== operatingUser.emailAddress
    ) {
      desiredEmailEffect = "modify-pending-change";
    } else if (
      !sails.config.custom.verifyEmailAddresses ||
      operatingUser.emailStatus === "unconfirmed"
    ) {
      desiredEmailEffect = "change-immediately";
    } else {
      desiredEmailEffect = "begin-change";
    }

    // If the email address is changing, make sure it is not already being used.
    if (
      _.contains(
        ["begin-change", "change-immediately", "modify-pending-change"],
        desiredEmailEffect
      )
    ) {
      let conflictingUser = await User.findOne({
        or: [{
            emailAddress: newEmailAddress
          },
          {
            emailChangeCandidate: newEmailAddress
          },
        ],
      });
      if (conflictingUser && conflictingUser.id !== id) {
        sails.log.debug(conflictingUser, id, emailAddress);
        throw "emailAlreadyInUse";
      }
    }

    // Start building the values to set in the db.
    // (We always set the fullName if provided.)
    var valuesToSet = {
      fullName,
      company_id: companyAdmin,
    };

    sails.log.debug("Email change effect: ", desiredEmailEffect);
    switch (desiredEmailEffect) {
      // Change now
      case "change-immediately":
        _.extend(valuesToSet, {
          emailAddress: newEmailAddress,
          emailChangeCandidate: "",
          emailProofToken: await sails.helpers.strings.random("url-friendly"),
          emailProofTokenExpiresAt: null,
          emailStatus: operatingUser.emailStatus === "unconfirmed" ?
            "unconfirmed" :
            "confirmed",
        });
        break;

        // Begin new email change, or modify a pending email change
      case "begin-change":
      case "modify-pending-change":
        _.extend(valuesToSet, {
          emailChangeCandidate: newEmailAddress,
          emailProofToken: await sails.helpers.strings.random("url-friendly"),
          emailProofTokenExpiresAt: Date.now() + sails.config.custom.emailProofTokenTTL,
          emailStatus: "change-requested",
        });
        break;

        // Cancel pending email change
      case "cancel-pending-change":
        _.extend(valuesToSet, {
          emailChangeCandidate: "",
          emailProofToken: "",
          emailProofTokenExpiresAt: 0,
          emailStatus: "confirmed",
        });
        break;

        // Otherwise, do nothing re: email
    }

    // Save to the db
    await User.updateOne({
      id: operatingUser.id
    }).set(valuesToSet);

    // If this is an immediate change, and billing features are enabled,
    // then also update the billing email for this user's linked customer entry
    // in the Stripe API to make sure they receive email receipts.
    // > Note: If there was not already a Stripe customer entry for this user,
    // > then one will be set up implicitly, so we'll need to persist it to our
    // > database.  (This could happen if Stripe credentials were not configured
    // > at the time this user was originally created.)
    if (
      desiredEmailEffect === "change-immediately" &&
      sails.config.custom.enableBillingFeatures
    ) {
      let didNotAlreadyHaveCustomerId = !operatingUser.stripeCustomerId;
      let stripeCustomerId = await sails.helpers.stripe.saveBillingInfo
        .with({
          stripeCustomerId: operatingUser.stripeCustomerId,
          emailAddress: newEmailAddress,
        })
        .timeout(5000)
        .retry();
      if (didNotAlreadyHaveCustomerId) {
        await User.updateOne({
          id: operatingUser.id
        }).set({
          stripeCustomerId,
        });
      }
    }

    // If an email address change was requested, and re-confirmation is required,
    // send the "confirm account" email.
    if (
      desiredEmailEffect === "begin-change" ||
      desiredEmailEffect === "modify-pending-change"
    ) {
      await sails.helpers.sendTemplateEmail.with({
        to: newEmailAddress,
        subject: "Your account has been updated",
        template: "email-verify-new-email",
        templateData: {
          fullName: fullName || operatingUser.fullName,
          token: valuesToSet.emailProofToken,
        },
      });
    }
  },
};
