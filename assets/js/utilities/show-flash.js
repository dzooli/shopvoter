/**
 * showFlash()
 *
 * Show a flash message by sending the appropriate events.
 *
 * -----------------------------------------------------------------
 * @param {String} type         The alert type defined by Bootstrap (like: 'success', 'warning', 'danger', 'info')
 * @param {String} message      Message to display
 * @param {boolean} dismissable The flash message is dismissable or not (optional). Default: true
 * @param {Object} component    The sender component
 * -----------------------------------------------------------------
 *
 */
parasails.registerUtility(
  "showFlash",
  function (type, message, dismissable, component) {
    component.$root.$emit("change-notification-type", type);
    component.$root.$emit(
      "change-notification-dismissable",
      dismissable !== undefined ? dismissable : true
    );
    component.$root.$emit("change-notification-text", message);
  }
);
