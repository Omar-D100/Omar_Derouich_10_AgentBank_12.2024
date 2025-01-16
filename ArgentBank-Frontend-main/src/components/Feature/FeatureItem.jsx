/* eslint-disable react/prop-types */

function FeatureItem({ icon, altText, title, description }) {
  const imageUrl = new URL(`../../assets/img/${icon}`, import.meta.url).href;

  return (
    <div className="feature-item">
      <img src={imageUrl} alt={altText} className="feature-icon" />
      <h3 className="feature-item-title">{title}</h3>
      <p>{description}</p>
    </div>
  );
}

export default FeatureItem;