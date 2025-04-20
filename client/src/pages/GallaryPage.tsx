import { ImageCard } from '../components/ImageCard';

export const GalleryPage: React.FC = () => {
  const images = [
    'https://i.pinimg.com/236x/d6/46/20/d64620e0802d2a47aff2746b64c5d04a.jpg',
    'https://i.pinimg.com/736x/c6/e7/59/c6e7598370a4c18f47d634bfa90728fb.jpg',
    'https://i.pinimg.com/564x/2b/6c/5a/2b6c5a40327e37d22edef09fb4d8f6b1.jpg',
    'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQXFR675N9W8NrLUaq5JCOQIiw79UKmSCtOmg&s',
    'https://i.pinimg.com/736x/1b/23/1d/1b231dad54d12e2ab78f7c1d61f8d082.jpg',
    'https://i.pinimg.com/236x/2b/a3/02/2ba30260741ec7166aa4e4d6b72e5d80.jpg',
    'https://i.pinimg.com/736x/bf/0a/d1/bf0ad1a35a6ab9afeaaca83d70a3c8fd.jpg',
    'https://i.pinimg.com/736x/a4/c8/cd/a4c8cddcf41ae27cc004c5f0a3cefcab.jpg',
    'https://i.pinimg.com/750x/fa/8b/e7/fa8be7e4241e0305a55147969e785173.jpg',
    'https://i.pinimg.com/736x/66/f8/06/66f806d43770f92c651a652f559ec0af.jpg',
    'https://i.pinimg.com/736x/92/ed/51/92ed51829592e8acb9befd792bdb5e26.jpg',
    'https://i.pinimg.com/736x/d2/50/6f/d2506f0bf12ddb9cd9ad707c9a1645ff.jpg',
    'https://images.pexels.com/photos/15377956/pexels-photo-15377956.jpeg?cs=srgb&dl=pexels-bayfilm9-15377956.jpg&fm=jpg',
    'https://i.pinimg.com/564x/1c/24/83/1c2483b19580592609a656543078a3d0.jpg',
    'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRe7SUvd2H_cfL4pJ8c8MK0JrMv9OYAYn8vcg&s',
    'https://i.pinimg.com/236x/70/9c/fb/709cfb16e872d2f44086a0c51f81b9b8.jpg',
    'https://images.unsplash.com/photo-1583889196099-2d51d5a98dbc?fm=jpg&q=60&w=3000&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    'https://image-cdn-ak.spotifycdn.com/image/ab67706c0000da840579c443c3aabcf90fdd8d12',
    'https://i.pinimg.com/736x/c9/37/98/c937986e82fec802e098fb50544b859e.jpg',
    'https://d2bzx2vuetkzse.cloudfront.net/fit-in/0x450/unshoppable_producs/9fd68767-353e-4e5a-ae5d-35f0e3bce01d.jpeg',
    'https://i.pinimg.com/1200x/c5/10/9d/c5109d9be955064067eae5b7373ce88c.jpg',
    'https://i.pinimg.com/564x/75/0a/a1/750aa1939a9b02ce3ad74b452a949019.jpg',
    'https://i.pinimg.com/736x/63/7e/53/637e53f46069999240200393c02652b0.jpg',
    'https://gjmsoundpr.com/cdn/shop/articles/bass-guitars-814101_800x.jpg?v=1680551622',
    'https://st4.depositphotos.com/33196832/41211/i/450/depositphotos_412117826-stock-photo-guitar-closeup-dark-background-copy.jpg',
    'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ977V-oKITvZI8YQcXECRZLs5IYC_tRiZw2A&s',
    'https://i.pinimg.com/736x/90/12/62/901262cec19b752373669abef52a6000.jpg',
    'https://i.pinimg.com/236x/c0/35/dc/c035dc1eabc36e1022cea82026d7cbc4.jpg',
    'https://i.pinimg.com/736x/91/73/81/9173810ba09086fb5a64508539682f89.jpg',
    'https://i.pinimg.com/736x/57/9c/e5/579ce501b8c6d2a3731b4950cdb60500.jpg',
    'https://i.pinimg.com/736x/dd/03/87/dd0387b326ea9870be9818b459f1429f.jpg',
  ];

  return (
    <div className="p-4 h-[95vh] w-[95%] m-auto overflow-hidden overflow-y-auto">
      <div className="columns-2 md:columns-3 lg:columns-7 gap-2 space-y-2">
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
