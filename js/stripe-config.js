
/*
  Mortéa Stripe Payment Links Configuration

  Replace the placeholder URLs below with real Stripe Payment Links:
  Stripe Dashboard → Payment Links → Create payment link

  Plans:
  - professional: $35/month with 5-day free trial
  - creator: $30/month with 5-day free trial
  - single_user: $10/month with 5-day free trial
*/

const MORTEA_STRIPE_LINKS = {
  professional: "https://buy.stripe.com/REPLACE_PROFESSIONAL_35",
  creator: "https://buy.stripe.com/REPLACE_CREATOR_30",
  single_user: "https://buy.stripe.com/REPLACE_SINGLE_USER_10"
};

function getStripeCheckoutLink(planType) {
  return MORTEA_STRIPE_LINKS[planType] || MORTEA_STRIPE_LINKS.professional;
}
