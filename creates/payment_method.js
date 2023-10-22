// create a particular payment method
const perform = async (z, bundle) => {
  const response = await z.request({
    method: 'POST',
    url: 'https://api.paymongo.com/v1/payment_methods',
    // if `body` is an object, it'll automatically get run through JSON.stringify
    // if you don't want to send JSON, pass a string in your chosen format here instead
    body: {
      data: {
        attributes: {
          type: bundle.inputData.type,
          details: {
            card_number: bundle.inputData.card_number,
            exp_month: bundle.inputData.exp_month,
            exp_year: bundle.inputData.exp_year,
            cvc: bundle.inputData.cvc
          },
          billing: {
            address: {
              line1: bundle.inputData.line1,
              line2: bundle.inputData.line2,
              city: bundle.inputData.city,
              state: bundle.inputData.state,
              postal_code: bundle.inputData.postal_code,
              country: bundle.inputData.country
            },
            name: bundle.inputData.name,
            email: bundle.inputData.email,
            phone: bundle.inputData.phone
          }
        }
      }
    }
  });
  // this should return a single object
  return response.data;
};

module.exports = {
  // see here for a full list of available properties:
  // https://github.com/zapier/zapier-platform/blob/main/packages/schema/docs/build/schema.md#createschema
  key: 'payment_method',
  noun: 'Paymentmethod',

  display: {
    label: 'Create Paymentmethod',
    description: 'Creates a new paymentmethod, probably with input from previous steps.'
  },

  operation: {
    perform,

    // `inputFields` defines the fields a user could provide
    // Zapier will pass them in as `bundle.inputData` later. They're optional.
    // End-users will map data into these fields. In general, they should have any fields that the API can accept. Be sure to accurately mark which fields are required!
    inputFields: [
      {key: 'name', required: true},
      {key: 'fave_meal', label: 'Favorite Meal', required: false}
    ],

    // In cases where Zapier needs to show an example record to the user, but we are unable to get a live example
    // from the API, Zapier will fallback to this hard-coded sample. It should reflect the data structure of
    // returned records, and have obvious placeholder values that we can show to any user.
    sample: {
      id: 1,
      name: 'Test'
    },

    // If fields are custom to each user (like spreadsheet columns), `outputFields` can create human labels
    // For a more complete example of using dynamic fields see
    // https://github.com/zapier/zapier-platform/tree/main/packages/cli#customdynamic-fields
    // Alternatively, a static field definition can be provided, to specify labels for the fields
    outputFields: [
      // these are placeholders to match the example `perform` above
      // {key: 'id', label: 'Person ID'},
      // {key: 'name', label: 'Person Name'}
    ]
  }
};
