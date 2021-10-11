# Development notes a gists

## Dismissable alert HTML

Requires [Bootstrap](https://getbootstrap.com/docs/5.1/getting-started/introduction/) with [FontAwesome](https://fontawesome.com/v6.0/icons?s=solid%2Cbrands).

```html
  <div>

    <div class="container-fluid flex-lg-row flex-md-fill justify-content-between" style="
    display: flex;
">
    <div role="alert" class="alert alert-danger flex-fill mt-2 small">
        message
    </div>

    <div role="alert" class="alert alert-danger fa fa-close mt-2 small"></div>

    </div></div>
```

## Add parasails utility function

```javascript
// Register
parasails.registerUtility('name', function(params) {body;});

// Usage

parasails.util.name(params);
```

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
