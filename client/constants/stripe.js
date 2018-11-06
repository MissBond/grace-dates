const STRIPE_PUBLISHABLE = process.env.NODE_ENV === 'production'
  ? 'pk_test_ZKBtEXfyiNx7hi5G6pROsN5d'
  : 'pk_test_ZKBtEXfyiNx7hi5G6pROsN5d';

  // const STRIPE_PUBLISHABLE = process.env.NODE_ENV === 'production'
  // ? 'pk_live_MY_PUBLISHABLE_KEY'
  // : 'pk_test_MY_PUBLISHABLE_KEY';


export default STRIPE_PUBLISHABLE;
