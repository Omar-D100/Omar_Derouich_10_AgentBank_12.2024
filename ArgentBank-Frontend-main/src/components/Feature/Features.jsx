import FeatureItem from './FeatureItem';
import data from '../../data/HomeFeatures.json';

function Features() {
  const { featuresData } = data;

  return (
    <section className="features">
      <h2 className="sr-only">Features</h2>
      {featuresData.map((feature) => (
        <FeatureItem
          key={feature.id}
          icon={feature.icon}
          altText={feature.altText}
          title={feature.title}
          description={feature.description}
        />
      ))}
    </section>
  );
}

export default Features;