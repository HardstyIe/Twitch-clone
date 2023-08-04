import CarouselStream from '../CarouselStream/CarouselStream';
import StreamLine from '../StreamLine/StreamLine';

const RighsideHomepage = ({ data, userData, setLimit, limit, streamerInfo }) => {
  const titleTemplates = [
    'Streams qui pourraient vous plaire',
    `Pendant que {username} est hors ligne`,
    `Personne jouant à {game}`,
    'Streams recommandés pour vous',
    `Regardez les streams en tête de {game}`,
    'Découvrez de nouveaux streamers',
    `Pendant que {username} est hors ligne, regardez ceci`,
    `Les streams les plus populaires de {game}`,
    'Les streams en vogue',
    `{username} a récemment joué à {game}`,
    `Nouveaux streamers jouant à {game}`,
  ];

  function generateRandomTitle(streamerInfo) {
    // Assurez-vous que streamerInfo est un tableau non vide
    if (streamerInfo && streamerInfo.length > 0) {
      // Choisissez un objet info au hasard
      const info = streamerInfo[Math.floor(Math.random() * streamerInfo.length)];

      // Choisissez un modèle de titre au hasard
      const template = titleTemplates[Math.floor(Math.random() * titleTemplates.length)];

      // Remplacez les variables dans le modèle par les valeurs fournies
      const title = template.replace('{username}', info.username).replace('{game}', info.game);

      // Assurez-vous que le titre est une chaîne
      return title;
    }

    // Si streamerInfo est vide ou n'est pas un tableau, retournez une chaîne vide ou une chaîne par défaut
    return 'Default title';
  }


  return (
    <div className={"w-full"}>
      {userData && userData.length > 0 ? (

        <div>
          <CarouselStream data={data} userData={userData} />
          <div className={"w-full justify-between"}>
            <StreamLine title={generateRandomTitle(streamerInfo)} userData={userData} streams={data} onShowMore={() => setLimit(limit + 12)} />

          </div>
        </div>

      ) : (
        <div>Loading...</div>
      )}
    </div>
  );

};

export default RighsideHomepage;
