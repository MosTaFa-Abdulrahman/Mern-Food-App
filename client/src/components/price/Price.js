// From ((Thumbnails + Food + Cart + OrderItemsList Orders)) Comp+page
function Price({ price, locale, currency }) {
  const formatPrice = () =>
    new Intl.NumberFormat(locale, {
      style: "currency",
      currency,
    }).format(price);

  return <span>{formatPrice()}</span>;
}

Price.defaultProps = {
  locale: "en-US",
  currency: "USD",
};

export default Price;
