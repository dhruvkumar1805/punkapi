import React, { useEffect, useState } from "react";

const App = () => {
  const [beers, setBeers] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    fetch("https://api.punkapi.com/v2/beers")
      .then((response) => response.json())
      .then((data) => setBeers(data));
  }, []);

  const filteredBeers = beers.filter((beer) =>
    beer.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="flex flex-col justify-center items-center bg-gray-100 p-6">
      <input
        type="text"
        placeholder="Search beers..."
        className="p-2 mb-4 border-2 border-gray-300 rounded-md"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredBeers.map((beer, index) => (
          <div
            key={index}
            className="bg-gray-600 rounded-lg overflow-hidden shadow-md"
          >
            <img
              className="w-full h-80 object-cover"
              src={beer.image_url}
              alt={beer.name}
            />
            <div className="p-6 flex flex-col justify-center">
              <h2 className="text-2xl font-bold mb-2 text-white tracking-wider">
                {beer.name}
              </h2>
              <p className="text-sm text-white mb-4">{beer.tagline}</p>
              <div className="flex items-center">
                <p className="text-sm text-white">{beer.abv}%</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default App;
