import { useRouter } from 'next/router';
import { useState, useEffect } from 'react';
import axios from 'axios';

const Recipes = () => {
  const router = useRouter();
  const [searchbar, setsearchbar] = useState('');
  const [loginflag, setloginflag] = useState(true);
  const [data, setdata] = useState([]);
  const [filters, setfilters] = useState([]);
  const [filtersort, setfiltersort] = useState([]);
  const [filterdata, setfilterdata] = useState([]);

  async function handleLiked(_id) {
    if (localStorage.getItem('token')) {
      let url = `api/user?token=${localStorage.getItem('token')}`;
      const response = await axios.put(url, { recipe: _id });
      console.log(response.data.response.liked);
    } else {
      router.push('/user');
    }
  }

  function filterSorting() {
    if (filtersort.length === 0) {
      setfilterdata(data);
    } else {
      const filter = data.filter((recipe) => filtersort.includes(recipe.categorie));
      console.log('After filtering:', filter);
      setfilterdata(filter);
    }
  }

  function sortusingsearch() {
    const filteredRecipes = data.filter(
      (recipe) => recipe.name === searchbar || recipe.name.split(' ')[0] === searchbar
    );
    setfilterdata(filteredRecipes);
  }

  const fetchdata = async () => {
    try {
      let url = 'api/recipes';
      const response = await axios.get(url);
      if (response.data.recipes) {
        setdata(response.data.recipes);
        const uniqueFilters = new Set(response.data.recipes.map((e) => e.categorie));
        setfilters(Array.from(uniqueFilters));
      }
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  const log = () => {
    let x = localStorage.getItem('loged');
    if (x === 'true') {
      setloginflag(false);
    } else {
      setloginflag(true);
    }
  };

  useEffect(() => {
    fetchdata();
    log();
  }, []);

  return (
    <div>
      {data.length > 0 ? (
        <div>
          {/* Main header Section */}
          <div className=" grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 justify-between pl-8 py-4 m-2 mr-0">
            {/* Head */}
            <div className="col-span-full md:col-span-1 items-center mb-4 md:mb-0">
              <p className="text-4xl font-bold text-blue-500">
                Cullina Share
              </p>
              <p
                className="text-xl font-semibold cursor-pointer mt-2 text-slate-600"
                onClick={() => {
                  router.push('/components/about');
                }}
              >
                About Us
              </p>
            </div>

            {/* Search bar */}
            <div className="col-span-full md:col-span-1 flex justify-between mb-4 md:mb-0">
              <input
                type="text"
                placeholder="Search your Favourite Recipe..."
                onChange={(e) => {
                  setsearchbar(e.target.value);
                }}
                className="w-full md:w-3/4 bg-slate-100 rounded-l-xl h-12 pl-4"
              ></input>
              <button
                className="w-1/4 h-12 text-white rounded-r-xl bg-blue-400 hover:bg-blue-500 transition-all duration-300"
                onClick={() => {
                  sortusingsearch();
                }}
              >
                Search
              </button>
            </div>

            {/* Login & Logout */}
            <div className="col-span-1 mt-4 md:mt-0">
              {loginflag ? (
                <div className="flex justify-center items-center gap-3">
                  <img
                    width={40}
                    alt="photo"
                    src="https://assets.nationbuilder.com/themes/6209a58e4764e819c8d303f8/attachments/original/1644877550/login.png?1644877550"
                  ></img>
                  <button
                    className="font-semibold text-lg"
                    onClick={() => {
                      router.push({ pathname: '/user' });
                    }}
                  >
                    Log In/Sign Up
                  </button>
                </div>
              ) : (
                <div className="grid grid-cols-1 p-1 pt-0 ">
                  <div className=' flex justify-end mr-20'>
                  <button
                    className="font-bold text-xl text-slate-500 mx-end mb-1"
                    onClick={() => {
                      setloginflag(!loginflag);
                      localStorage.removeItem('token');
                      localStorage.removeItem('loged');
                    }}
                  >
                    Log Out
                  </button>
                  </div>
                  <div className="flex gap-3 justify-end">
                    <p
                      className="text-md text-blue-600 cursor-pointer"
                      onClick={() => router.push('/user/postrecipe')}
                    >
                      Post Recipe
                    </p>
                    <p
                      className="text-md text-yellow-600 cursor-pointer mr-5"
                      onClick={() => router.push('/user/liked')}
                    >
                      Liked Recipes
                    </p>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Recipes & Filter */}
          <div className="grid grid-cols-1 md:grid-cols-12">
            {/* Filter */}
            <div className="col-span-3 p-3 mx-6 grid grid-cols-1">
              <div className="mt-6 mb-0">
                {filters?.map((e) => {
                  return (
                    <div
                      key={e}
                      className="grid grid-cols-2 mr-1 text-sm sm:text-base items-center font-semibold m-3 sm:m-7"
                    >
                      <label className="col-span-1 text-lg sm:text-2xl font-semibold text-slate-700">
                        {e}
                      </label>
                      <input
                        type="checkbox"
                        className="cursor-pointer h-6"
                        value={e}
                        onChange={(ele) => {
                          setfiltersort((prevFilters) =>
                            ele.target.checked
                              ? [...prevFilters, e]
                              : prevFilters.filter((item) => item !== e)
                          );
                        }}
                      ></input>
                    </div>
                  );
                })}
                <button
                  className="bg-blue-400 w-full h-[40px] rounded-lg mt-4 text-white font-semibold text-sm sm:text-base"
                  onClick={() => {
                    filterSorting();
                  }}
                >
                  Search
                </button>
              </div>
            </div>

            {/* Recipes */}
            <div className="col-span-9 md:col-span-8 mr-3 p-3 mt-5 grid grid-cols-1 gap-8">
              {(filterdata.length ? filterdata : data).map((e) => {
                return (
                  <div
                    key={e}
                    className="grid grid-cols-1 md:grid-cols-2 justify-between gap-8 border-b-2 p-7 border-slate-300"
                  >
                    {/* Img box */}
                    <div>
                      <img
                        alt="recipe-photo"
                        src={e?.url}
                        className="rounded-lg w-full md:w-[400px] h-[300px] object-fit"
                      ></img>
                    </div>

                    {/* Box details */}
                    <div>
                      <div className="flex justify-between">
                        <p className="text-3xl font-bold uppercase text-slate-700 text-start">
                          {e?.name}
                        </p>
                        <p className="text-xl font-semibold text-blue-500 ">
                          {e?.categorie}
                        </p>
                      </div>
                      {e.ingredients?.length < 5 ? (
                        <div className="text-lg text-slate-700 mt-6 grid grid-cols-2">
                          {e.ingredients.map((ing) => {
                            return <li className="" key={ing}>{ing}</li>;
                          })}
                        </div>
                      ) : (
                        <div className="text-lg grid grid-cols-2 text-slate-700 mt-6">
                          {e.ingredients?.slice(0, 4).map((ing) => {
                            return <li key={ing}>{ing}</li>;
                          })}
                        </div>
                      )}
                      <div className="mt-4">
                        {e.detail?.length < 100 ? (
                          <p className="text-lg text-slate-500  break-words">
                            {e.detail}....
                          </p>
                        ) : (
                          <p className="text-lg text-slate-500 break-words">
                            {e.detail?.slice(0, 100)}...
                          </p>
                        )}
                      </div>
                      <div className="mt-3 flex justify-between">
                        <button
                          className="text-blue-600 "
                          onClick={() => {
                            localStorage.setItem("recipeID",e._id);
                            router.push(`/recipe/${e._id}`);
                          }}
                        >
                          See More
                        </button>
                        <p className="text-xl font-bold text-slate-500">
                          {e.nationality}
                        </p>
                      </div>
                      <p
                        className="text-thin mt-1 cursor-pointer"
                        onClick={() => {
                          handleLiked(e._id);
                        }}
                      >
                        Add to Liked
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Footer */}
          <footer className="bg-gray-800 text-white py-8 mt-16">
            <div className="container mx-auto flex flex-col items-center">
              <p className="text-2xl font-bold mb-4">Stay Connected</p>
              <p className="mt-4">
                &copy; 2024 Cullina Share. All rights reserved - Varun Sharma
              </p>
            </div>
          </footer>
        </div>
      ) : (
        <div className="loader mx-auto mt-[20%]"></div>
      )}
    </div>
  );
};

export default Recipes;
