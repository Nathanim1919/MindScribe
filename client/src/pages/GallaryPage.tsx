import { ImageCard } from "../components/ImageCard";

export const GalleryPage: React.FC = () => {
  const images = [
    'https://avatars.githubusercontent.com/u/106013719?v=4',
    'https://i.redd.it/z4e1pulumu301.jpg',
    'https://www.mtdtraining.com/wp-content/uploads/2023/12/steeve-jobs.jpg',
    'https://mau.com/wp-content/uploads/2022/11/From-Setbacks-to-Success-1.png',
    'https://c8.alamy.com/comp/CY7J48/death-of-steve-jobs-a-memorial-created-by-apple-fans-outside-the-apple-CY7J48.jpg',
    'https://pbs.twimg.com/media/F7NvJL0aIAATBh0.jpg:large',
    'https://www.tuposter.com/pub/media/catalog/product/cache/71d04d62b2100522587d43c930e8a36b/s/t/steve_jobs_y_wozniak_p_ster.png',
    'https://images.squarespace-cdn.com/content/v1/56cecb5ca3360c3f9d45c441/1456817769297-E3ZGMJZATIASJ79ADVCA/young-steve-jobs-1_0.jpg',
    'https://media.wired.com/photos/66a02c25473ac06ecbb29e7f/master/w_2560%2Cc_limit/Plaintext-Steve-Jobs-Business-685197025.jpg',
    'https://static.ffx.io/images/$width_620%2C$height_349/t_crop_fill/q_86%2Cf_auto/fbcc69a62946f9f2be6dbd78c174ef84dee9711a',
    'https://assets.newatlas.com/dims4/default/9be5193/2147483647/strip/true/crop/1847x1231+37+0/resize/1200x800!/quality/90/?url=http%3A%2F%2Fnewatlas-brightspot.s3.amazonaws.com%2Fe0%2F18%2F6e0fbe0d40338dd6a7a99f74a5f2%2Fscreenshot-2024-08-20-at-9.50.52%E2%80%AFpm.jpg',
    'https://m.media-amazon.com/images/I/510XrizgNwL._AC_UF1000,1000_QL80_.jpg',
    'https://www.bamradionetwork.com/wp-content/uploads/2023/08/steve-jobs-900x600.jpeg',
    'https://media.wired.com/photos/66a02c25473ac06ecbb29e7f/master/w_2560%2Cc_limit/Plaintext-Steve-Jobs-Business-685197025.jpg',
    'https://static.ffx.io/images/$width_620%2C$height_349/t_crop_fill/q_86%2Cf_auto/fbcc69a62946f9f2be6dbd78c174ef84dee9711a',
    'https://images.pexels.com/photos/1108099/pexels-photo-1108099.jpeg',
    'https://miro.medium.com/v2/resize:fit:1400/1*9cRaXQ5ZOqNzsmpAsTTS_w.jpeg',
    'https://www.hollywoodreporter.com/wp-content/uploads/2011/10/jobs_a.jpg',
    'https://media.newyorker.com/photos/590971d62179605b11ad7b62/16:9/w_1280,c_limit/111114_r21545_g2048.jpg',
  ];

  return (
    <div className="p-4 h-[95vh] overflow-hidden overflow-y-auto">
      <div className="columns-2 md:columns-3 lg:columns-4 gap-2 space-y-2">
        {images.map((src, idx) => (
          <ImageCard
            key={src}
            url={src}
            date="Jan 22, 2025"
            entrieId="jkhkjwhdkjkasj"
            caption={`Sample caption: This striking image number ${idx + 1} beautifully captures the essence of modern creativity, evoking a sense of wonder and artistic vision that inspires every viewer.`}
          />
        ))}
      </div>
    </div>
  );
};
