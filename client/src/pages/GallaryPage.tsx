import { useState } from 'react';
import { FullScreenImageModal } from '../components/FullScreenImageModal';
import { ImageCard } from '../components/ImageCard';
import { ImageCardProps } from '../types/sideBar.type';

export const GalleryPage: React.FC = () => {
  const imageCards: ImageCardProps[] = [
    {
      url: 'https://i.pinimg.com/236x/d6/46/20/d64620e0802d2a47aff2746b64c5d04a.jpg',
      caption: 'Cozy vibes with soft tones',
      date: '2025-04-17',
      entrieId: 'entry-001',
    },
    {
      url: 'https://i.pinimg.com/736x/c6/e7/59/c6e7598370a4c18f47d634bfa90728fb.jpg',
      caption: 'Abstract interior mood',
      date: '2025-04-17',
      entrieId: 'entry-002',
    },
    {
      url: 'https://i.pinimg.com/564x/2b/6c/5a/2b6c5a40327e37d22edef09fb4d8f6b1.jpg',
      caption: 'Muted colors for calm minds',
      date: '2025-04-17',
      entrieId: 'entry-003',
    },
    {
      url: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQXFR675N9W8NrLUaq5JCOQIiw79UKmSCtOmg&s',
      caption: 'Gritty grayscale vibes',
      date: '2025-04-17',
      entrieId: 'entry-004',
    },
    {
      url: 'https://i.pinimg.com/736x/1b/23/1d/1b231dad54d12e2ab78f7c1d61f8d082.jpg',
      caption: 'Dreamy windowscape',
      date: '2025-04-17',
      entrieId: 'entry-005',
    },
    {
      url: 'https://i.pinimg.com/236x/2b/a3/02/2ba30260741ec7166aa4e4d6b72e5d80.jpg',
      caption: 'Chill tones, studio setup',
      date: '2025-04-17',
      entrieId: 'entry-006',
    },
    {
      url: 'https://i.pinimg.com/736x/bf/0a/d1/bf0ad1a35a6ab9afeaaca83d70a3c8fd.jpg',
      caption: 'Earthy palette harmony',
      date: '2025-04-17',
      entrieId: 'entry-007',
    },
    {
      url: 'https://i.pinimg.com/736x/a4/c8/cd/a4c8cddcf41ae27cc004c5f0a3cefcab.jpg',
      caption: 'High-end aesthetic feel',
      date: '2025-04-17',
      entrieId: 'entry-008',
    },
    {
      url: 'https://i.pinimg.com/750x/fa/8b/e7/fa8be7e4241e0305a55147969e785173.jpg',
      caption: 'Moody, artistic angle',
      date: '2025-04-17',
      entrieId: 'entry-009',
    },
    {
      url: 'https://i.pinimg.com/736x/66/f8/06/66f806d43770f92c651a652f559ec0af.jpg',
      caption: 'Nature inspired tones',
      date: '2025-04-17',
      entrieId: 'entry-010',
    },
    {
      url: 'https://i.pinimg.com/736x/92/ed/51/92ed51829592e8acb9befd792bdb5e26.jpg',
      caption: 'Warm light reflections',
      date: '2025-04-17',
      entrieId: 'entry-011',
    },
    {
      url: 'https://i.pinimg.com/736x/d2/50/6f/d2506f0bf12ddb9cd9ad707c9a1645ff.jpg',
      caption: 'Bold yet soft contrast',
      date: '2025-04-17',
      entrieId: 'entry-012',
    },
    {
      url: 'https://images.pexels.com/photos/15377956/pexels-photo-15377956.jpeg?cs=srgb&dl=pexels-bayfilm9-15377956.jpg&fm=jpg',
      caption: 'Real-life touch of emotion',
      date: '2025-04-17',
      entrieId: 'entry-013',
    },
    {
      url: 'https://i.pinimg.com/564x/1c/24/83/1c2483b19580592609a656543078a3d0.jpg',
      caption: 'Soft lens blur look',
      date: '2025-04-17',
      entrieId: 'entry-014',
    },
    {
      url: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRe7SUvd2H_cfL4pJ8c8MK0JrMv9OYAYn8vcg&s',
      caption: 'Vibrant pixel fade',
      date: '2025-04-17',
      entrieId: 'entry-015',
    },
    {
      url: 'https://i.pinimg.com/236x/70/9c/fb/709cfb16e872d2f44086a0c51f81b9b8.jpg',
      caption: 'Studio flat stillness',
      date: '2025-04-17',
      entrieId: 'entry-016',
    },
    {
      url: 'https://images.unsplash.com/photo-1583889196099-2d51d5a98dbc?fm=jpg&q=60&w=3000&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
      caption: 'Retro tones and film grain',
      date: '2025-04-17',
      entrieId: 'entry-017',
    },
    {
      url: 'https://image-cdn-ak.spotifycdn.com/image/ab67706c0000da840579c443c3aabcf90fdd8d12',
      caption: 'Music artwork inspiration',
      date: '2025-04-17',
      entrieId: 'entry-018',
    },
    {
      url: 'https://i.pinimg.com/736x/c9/37/98/c937986e82fec802e098fb50544b859e.jpg',
      caption: 'Vintage filtered emotion',
      date: '2025-04-17',
      entrieId: 'entry-019',
    },
    {
      url: 'https://d2bzx2vuetkzse.cloudfront.net/fit-in/0x450/unshoppable_producs/9fd68767-353e-4e5a-ae5d-35f0e3bce01d.jpeg',
      caption: 'Muted product showcase',
      date: '2025-04-17',
      entrieId: 'entry-020',
    },
    {
      url: 'https://i.pinimg.com/1200x/c5/10/9d/c5109d9be955064067eae5b7373ce88c.jpg',
      caption: 'Overhead angle drama',
      date: '2025-04-17',
      entrieId: 'entry-021',
    },
    {
      url: 'https://i.pinimg.com/564x/75/0a/a1/750aa1939a9b02ce3ad74b452a949019.jpg',
      caption: 'Serene corner space',
      date: '2025-04-17',
      entrieId: 'entry-022',
    },
    {
      url: 'https://i.pinimg.com/736x/63/7e/53/637e53f46069999240200393c02652b0.jpg',
      caption: 'Hidden depth in frames',
      date: '2025-04-17',
      entrieId: 'entry-023',
    },
    {
      url: 'https://gjmsoundpr.com/cdn/shop/articles/bass-guitars-814101_800x.jpg?v=1680551622',
      caption: 'Studio guitar vibe',
      date: '2025-04-17',
      entrieId: 'entry-024',
    },
    {
      url: 'https://st4.depositphotos.com/33196832/41211/i/450/depositphotos_412117826-stock-photo-guitar-closeup-dark-background-copy.jpg',
      caption: 'Close-up concert mood',
      date: '2025-04-17',
      entrieId: 'entry-025',
    },
    {
      url: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ977V-oKITvZI8YQcXECRZLs5IYC_tRiZw2A&s',
      caption: 'Artistic pixel noise',
      date: '2025-04-17',
      entrieId: 'entry-026',
    },
    {
      url: 'https://i.pinimg.com/736x/90/12/62/901262cec19b752373669abef52a6000.jpg',
      caption: 'Solo still presence',
      date: '2025-04-17',
      entrieId: 'entry-027',
    },
    {
      url: 'https://i.pinimg.com/236x/c0/35/dc/c035dc1eabc36e1022cea82026d7cbc4.jpg',
      caption: 'Flat minimal scene',
      date: '2025-04-17',
      entrieId: 'entry-028',
    },
    {
      url: 'https://i.pinimg.com/736x/11/fb/ff/11fbffc5224a387aaaf4c2f9d45266ac.jpg',
      caption: 'Soft framed silhouette',
      date: '2025-04-17',
      entrieId: 'entry-029',
    },
    {
      url: 'https://i.pinimg.com/736x/91/73/81/9173810ba09086fb5a64508539682f89.jpg',
      caption: 'Light through the frame',
      date: '2025-04-17',
      entrieId: 'entry-030',
    },
    {
      url: 'https://i.pinimg.com/736x/57/9c/e5/579ce501b8c6d2a3731b4950cdb60500.jpg',
      caption: 'Architectural still frame',
      date: '2025-04-17',
      entrieId: 'entry-031',
    },
    {
      url: 'https://i.pinimg.com/736x/dd/03/87/dd0387b326ea9870be9818b459f1429f.jpg',
      caption: 'Moody expression frame',
      date: '2025-04-17',
      entrieId: 'entry-032',
    },
    {
      url: 'https://miro.medium.com/v2/resize:fit:596/1*CbqS79EgxBX19ZDuv5g8TA.png',
      caption:
        'Inspiried by the thing i have never done before and the passion i have for it',

      date: '2025-04-17',
      entrieId: 'entry-033',
    },
    {
      url: 'https://i.pinimg.com/736x/e1/e5/61/e1e56172432d601265eca5897a9b5612.jpg',
      caption:
        'Inspiried by the thing i have never done before and the passion i have for it',

      date: '2025-04-17',
      entrieId: 'entry-034',
    },
    {
      url: 'https://i.pinimg.com/736x/26/51/e0/2651e0814b8874602dcc80e4d99cccfe.jpg',
      caption:
        'Inspiried by the thing i have never done before and the passion i have for it',

      date: '2025-04-17',
      entrieId: 'entry-035',
    },
    {
      url: 'https://i.pinimg.com/736x/4b/c8/4d/4bc84d6ab1a54bdb943c69be9a80e479.jpg',
      caption:
        'Inspiried by the thing i have never done before and the passion i have for it',

      date: '2025-04-17',
      entrieId: 'entry-036',
    },
    {
      url: 'https://i.pinimg.com/1200x/4f/5c/a8/4f5ca85bd4eca287e8888f83f8928c1d.jpg',
      caption:
        'Inspiried by the thing i have never done before and the passion i have for it',

      date: '2025-04-17',
      entrieId: 'entry-037',
    },
    {
      url: 'https://i.pinimg.com/736x/55/17/f5/5517f55e57cad053f14d09d4e93bcc55.jpg',
      caption:
        'Inspiried by the thing i have never done before and the passion i have for it',

      date: '2025-04-17',
      entrieId: 'entry-038',
    },
    {
      url: 'https://i.pinimg.com/564x/ea/c2/4c/eac24c05d1e1bcde2d61b09a68e51bc4.jpg',
      caption:
        'Inspiried by the thing i have never done before and the passion i have for it',

      date: '2025-04-17',
      entrieId: 'entry-039',
    },
    {
      url: 'https://i1.sndcdn.com/artworks-hHMcACZ5sR4nUVde-5SZb1Q-t1080x1080.jpg',
      caption:
        'Inspiried by the thing i have never done before and the passion i have for it',
      date: '2025-04-17',
      entrieId: 'entry-040',
    },
  ];
  const [selectedImage, setSelectedImage] = useState<null | ImageCardProps>(
    null,
  );

  return (
    <div className="p-4 h-[100%] w-[100%] m-auto overflow-hidden overflow-y-auto">
      {selectedImage && (
        <FullScreenImageModal
          image={selectedImage}
          onClose={() => setSelectedImage(null)}
        />
      )}

      <div className="columns-2 md:columns-3 lg:columns-7 gap-2 space-y-2">
        {imageCards.map((img, idx) => (
          <ImageCard
            index={idx}
            key={img.url}
            onClick={() => setSelectedImage(img)}
            url={img.url}
            date="Jan 22, 2025"
            entrieId="jkhkjwhdkjkasj"
            caption={`Sample caption: This striking image number ${idx + 1} beautifully captures the essence of modern creativity, evoking a sense of wonder and artistic vision that inspires every viewer.`}
          />
        ))}
      </div>
    </div>
  );
};
