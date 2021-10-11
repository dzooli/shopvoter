# Workflows and specifications

## Role definitions

- User:
  - Can select assigned shops and start voting
  - Update profile for itself.
- CompanyAdmin:
  - CRUD owned shops and owned users.
  - Assign the 'User' and 'CompanyAdmin' roles to the owned users.
  - Assign owned users to owned shops.
- SuperUser:
  - CRUD everything
  - Assign all roles and shops to every user.

## New user registration workflow

A new user has to be registered by itself via the 'Sign Up' navbutton. During the registration process he|she selects the company admin from the dropdown as his|her boss. This selection determines the Company for the user. After successful registration the companyadmin is able to assign roles and shops to the registered and owned user.

