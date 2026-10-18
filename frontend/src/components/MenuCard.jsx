import { useState } from 'react';

const placeholders = {
  ramen: '麺',
  sushi: '寿司',
  appetizers: '前',
  desserts: '菓',
  drinks: '茶',
};

export default function MenuCard({ item }) {
  const [imageFailed, setImageFailed] = useState(false);
  const showImage = item.image_url && !imageFailed;

  return (
    <article className="dish">
      <div className="dish__image">
        {showImage ? (
          <img
            src={item.image_url}
            alt={item.name}
            loading="lazy"
            onError={() => setImageFailed(true)}
          />
        ) : (
          <div className="dish__placeholder">{placeholders[item.category] || '桜'}</div>
        )}
      </div>
      <div className="dish__body">
        <div className="dish__top">
          <h3 className="dish__name">{item.name}</h3>
          <span className="dish__price">{Math.round(Number(item.price))} ₽</span>
        </div>
        <p className="dish__text">{item.description}</p>
      </div>
    </article>
  );
}