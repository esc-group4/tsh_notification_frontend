describe('Register for Popup Notification System Tests', () => {
  beforeEach(() => {
    // Mock OneSignal
    cy.window().then((win) => {
      win.OneSignalDeferred = [];
      win.OneSignal = {
        Notifications: {
          setDefaultUrl: cy.stub()
        },
        User: {
          PushSubscription: {
            id: 'mock-subscription-id',
            addEventListener: cy.stub().callsFake((event, callback) => {
              // Store the callback for later use
              win.mockedCallback = callback;
            }),
            removeEventListener: cy.stub()
          }
        }
      };

      // Mock the subscription change listener
      win.OneSignalDeferred.push = (fn) => {
        fn(win.OneSignal);
      };
    });

    // Intercept and mock the registerUser API call
    cy.intercept('GET', 'http://localhost:8001/staff/submit/*', (req) => {
      // Extract name and id from the URL
      const urlParts = req.url.split('/');
      const name = urlParts[urlParts.length - 2];
      const id = urlParts[urlParts.length - 1];
      
      // Mock successful registration
      req.reply({ statusCode: 200, body: { userName: name } });
    }).as('registerUser');

    // Visit the app before each test
    cy.visit('http://localhost:3001');
  });

  it('renders the input, buttons, and header', () => {
    cy.get('input[placeholder="Enter your name to register"]').should('be.visible');
    cy.contains('button', 'Click to register User').should('be.visible');
    cy.contains('button', 'View your user id').should('be.visible');
    cy.contains('h1', 'Please click the notification bell! Register your name afterwards.').should('be.visible');
  });

  it('registers the user and shows successful registration message', () => {
    const userName = 'testuser';

    cy.get('input[placeholder="Enter your name to register"]').type(userName);
    cy.contains('button', 'Click to register User').click();

    cy.contains('User is registered successfully!').should('be.visible');
  });

  it('handles registration errors', () => {
    // Modify the intercept to return an error
    cy.intercept('GET', 'http://localhost:8001/staff/submit/*', {
      statusCode: 500,
      body: { error: 'Registration failed' }
    }).as('registerUserError');

    cy.get('input[placeholder="Enter your name to register"]').type('testuser');
    cy.contains('button', 'Click to register User').click();

    cy.wait('@registerUserError');

    cy.contains('Error registering user. Click the notification bell and try again.').should('be.visible');
  });

  it('does not show user id if not registered', () => {
    cy.contains('button', 'View your user id').click();
    cy.contains(/Subscription id:/i).should('not.exist');
  });
});
