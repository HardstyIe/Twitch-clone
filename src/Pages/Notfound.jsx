const Notfound = () => {
  return (
    <div className="flex items-center justify-center h-screen bg-gray-200">
      <div className="text-center">
        <h1 className="text-6xl font-bold text-red-600">404</h1>
        <p className="mt-3 text-xl">
          Désolé, la page que vous cherchez n'existe pas.
        </p>
        <p className="mt-2 text-lg">
          Retournez à la{" "}
          <a className="text-blue-500 underline" href="/">
            page d'accueil
          </a>
          .
        </p>
      </div>
    </div>
  );
};

export default Notfound;
