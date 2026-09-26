/* ============================================================
   VENDORA — Store Configuration
   Update these values with the client's real details.
   ============================================================ */
const STORE = {
  name: "Vendora",
  tagline: "Everything you love. Delivered.",
  currency: "₦",
  // Replace with the client's real WhatsApp number (international format, no +)
  whatsapp: "2348000000000",
  email: "orders@vendora.store",
  phoneDisplay: "+234 800 000 0000",
  address: "12 Market Road, Lagos, Nigeria",
  hours: "Mon – Sun, 8:00 AM – 10:00 PM",
  deliveryFee: 1500,
  freeDeliveryOver: 100000,
};

function formatNaira(amount) {
  return STORE.currency + amount.toLocaleString("en-NG");
}
