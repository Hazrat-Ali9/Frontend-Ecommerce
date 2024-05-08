import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import NewProduct from "../Product/NewProduct";
import useProduct from "../../Hook/useProduct";
import NewHome from "./Details/NewHome";
import LpgDetails from "./Details/LpgDetails";
import FavDetails from "./Details/FavDetails";
import SpecialDetails from "./Details/SpecialDetails";
import ExclusiveDetails from "./Details/ExclusiveDetails";
import MostDetails from "./Details/MostDetails";
import TradingDEtails from "./Details/TradingDEtails";
import PopularDetails from "./Details/PopularDetails";
import FlashDEtails from "./Details/FlashDEtails";
import AllDetails from "./Details/AllDetails";
import axios from "axios";

const Home = () => {
  const [products] = useProduct();
  const [items, setItems] = useState([]);
  const navigate = useNavigate();
  const [discountedProducts, setDiscountedProducts] = useState([]);
  const initialCountdown = { hours: 5, minutes: 0, seconds: 0 };
  const [countdown, setCountdown] = useState(
    JSON.parse(localStorage.getItem('countdown')) || initialCountdown
  );

  const [favorites,setFavorite]=useState([])
  useEffect(()=>{
    fetch('http://localhost:7000/favorite')
    .then(res => res.json())
    .then(data => setFavorite(data))
  },[])


  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('http://localhost:7000/product');
        const data = await response.json();

        // Filter out only discounted products
        const discounted = data.filter(product => product.discount);

        // Shuffle the array
        const shuffled = shuffleArray(discounted);

        // Take the first 6 items
        const selectedProducts = shuffled.slice(0, 6);

        setDiscountedProducts(selectedProducts);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  // Function to shuffle an array
  const shuffleArray = (array) => {
    const shuffled = [...array];
    for (let i = shuffled.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }
    return shuffled;
  };

  useEffect(() => {
    let interval;
    interval = setInterval(() => {
      setCountdown(prevCountdown => {
        const newCountdown = { ...prevCountdown };
        if (newCountdown.seconds > 0) {
          newCountdown.seconds -= 1;
        } else {
          if (newCountdown.minutes > 0) {
            newCountdown.minutes -= 1;
            newCountdown.seconds = 59;
          } else {
            if (newCountdown.hours > 0) {
              newCountdown.hours -= 1;
              newCountdown.minutes = 59;
              newCountdown.seconds = 59;
            } else {
              clearInterval(interval);
            }
          }
        }
        localStorage.setItem('countdown', JSON.stringify(newCountdown));
        return newCountdown;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  const fetchProductsByDiscount = async (discountPercentage) => {
    try {
      const response = await axios.get(`http://localhost:7000/discount?discountPercentage=${discountPercentage}`);
      return response.data;
    } catch (error) {
      console.error('Error fetching products:', error);
      return [];
    }
  };
  const handleButtonClick = async (discountPercentage) => {
    try {
      const filteredProducts = await fetchProductsByDiscount(discountPercentage);
      setItems(filteredProducts);
      // Navigate to discount component
      navigate('/discount', { state: { products: filteredProducts } });
    } catch (error) {
      console.error('Error handling button click:', error);
    }
  };
  return (
    <div>
      <img
        className="w-full mx-10"
        src="https://www.self-shopping.com/static/media/self-platfrom.2182d0b69eecc52ed1c7.png"
        alt=""
      />
      <div className="container mt-28 grid grid-cols-3 md:grid-cols-6 px-5">
        <Link to="/myOrder">
        <div className="card w-28 h-44">
          <figure>
            <img
              className="w-20 h-20 rounded-full"
              src="https://p1.hiclipart.com/preview/706/286/553/numix-circle-for-windows-wolfenstein-the-new-order-icon-png-icon.jpg"
              alt="Shoes"
            />
          </figure>
          <div className="card-body">
            <h2 className="font-semibold text-sm  mx-auto">আমার অর্ডার</h2>
          </div>
        </div>
        </Link>
        
      <Link to="/myRole">
      <div className="card w-28 h-44">
          <figure>
            <img
              className="w-16 h-16 rounded-full"
              src="https://cdn.iconscout.com/icon/free/png-256/free-dashboard-3561467-2985479.png?f=webp"
              alt="Shoes"
            />
          </figure>
          <div className="card-body">
            <h2 className="font-semibold text-sm  mx-auto">আমার ড্যাশবোর্ড</h2>
          </div>
        </div>
      </Link>
        
        <div className="card w-28 h-44">
          <figure>
            <img
              className="w-24 h-24 rounded-full"
              src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTNsgr2CieAnHqG-tWArxzlNOiS8JoizbDepMRibNMqug&s"
              alt="Shoes"
            />
          </figure>
          <div className="card-body">
            <h2 className="font-semibold text-sm  mx-auto">
              ফেবারিট প্রোডাক্ট
            </h2>
          </div>
        </div>
        <div className="card w-28 h-44">
          <figure>
            <img
              className="w-20 h-20 rounded-full"
              src="https://cdn3.emoji.gg/emojis/3336-verified-red.png"
              alt="Shoes"
            />
          </figure>
          <div className="card-body">
            <h2 className="font-semibold text-sm  mx-auto">
              ভ্যারিফাইড প্রোডাক্ট
            </h2>
          </div>
        </div>
        <div className="card w-28 h-44">
          <figure>
            <img
              className="w-16 h-16 rounded-full"
              src="https://cdn-icons-png.flaticon.com/256/8471/8471732.png"
              alt="Shoes"
            />
          </figure>
          <div className="card-body">
            <h2 className="font-semibold text-sm  mx-auto">সকল ক্যাটাগরি</h2>
          </div>
        </div>
        <div className="card w-28 h-44">
          <figure>
            <img
              className="w-16 h-16 rounded-full"
              src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT_sCS8IDiEY1abqq2TRc5H9sZlpCUjyJGsSlPAiX_2ag&s"
              alt="Shoes"
            />
          </figure>
          <div className="card-body">
            <h2 className=" font-semibold text-sm  mx-auto">ভেন্ডর সার্চ</h2>
          </div>
        </div>
      </div>

      <div className="flex justify-between items-center mt-5 px-5">
        <div className="h-14 w-44 bg-yellow-500 rounded-r-full">
          <h1 className="text-black font-normal text-xl mt-3 px-3">
            এসটিজি প্রোডাক্ট
          </h1>
        </div>
        <Link to='/stg'><a className="text-xl font-bold text-red-500" href="">
        সকল প্রোডাক্ট 
        </a></Link>
        
      </div>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-8 mt-14 px-5">
        {products
          .filter((product) => product.type === "stgProduct")
          .slice(0, 6)
          .map((product) => (
            <LpgDetails key={product._id} product={product} />
          ))}
      </div>
      <div className="flex justify-between items-center mt-5 px-5">
        <div className="h-14 w-44 bg-yellow-500 rounded-r-full">
          <h1 className="text-black font-normal text-2xl mt-3 px-3">
            নতুন পণ্য
          </h1>
        </div>
        <Link to="/new">
          <a className="text-xl font-bold text-red-500" href="">
            See More
          </a>
        </Link>
      </div>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-7 gap-2 mt-14 px-5">
        {products
          .filter((product) => product.type === "newProduct")
          .map((product) => (
            <NewHome key={product._id} product={product} />
          ))}
      </div>

      <div className="flex justify-between items-center mt-5 px-5 bg-red-500 h-16">
        <h1 className="text-xl font-bold text-white">Flash Sale</h1>
        <h1 className="text-md font-normal text-white">{countdown.hours}h {countdown.minutes}m {countdown.seconds}s</h1>
        <a className="text-xl font-bold text-white" href="">
          See More
        </a>
      </div>
      <div className="bg-orange-500 h-72">
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-2 px-5">
          {
            discountedProducts.map((product)=>(
              <FlashDEtails
              key={product._id}
              product ={product}
              />
            ))
          }
          
        </div>
      </div>
      <div className="flex justify-between items-center mt-10 px-5">
        <div className="h-14 w-44 bg-yellow-500 rounded-r-full">
          <h1 className="text-black font-normal text-2xl mt-3 px-3">
            বিশেষ পণ্য
          </h1>
        </div>

        <Link to='/special'><a className="text-xl font-bold text-red-500" href="">
        সকল প্রোডাক্ট 
        </a></Link>
      </div>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-7 gap-2 mt-14 px-5">
        {products
          .filter((product) => product.type === "specialProduct")
          .slice(0, 7)
          .map((product) => (
            <SpecialDetails key={product._id} product={product} />
          ))}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 mt-5 gap-3 px-5">
        <div className="h-32 bg-blue-500">
          <div className="flex justify-between text-white px-10 mt-8">
            <div>
              <h1 className="text-2xl font-bold">Discount</h1>
              <p>Discount more click here</p>
            </div>

            <h1 className="text-2xl font-bold">20%</h1>
          </div>
        </div>
        <div className="h-32 bg-emerald-300">
          <div className="flex justify-between text-white px-10 mt-8">
            <div>
              <h1 className="text-2xl font-bold">Discount</h1>
              <p>Discount more click here</p>
            </div>

            <h1 className="text-2xl font-bold">10%</h1>
          </div>
        </div>
        <div className="h-32 bg-orange-600">
          <div className="flex justify-between text-white px-10 mt-8">
            <div>
              <h1 className="text-2xl font-bold">Discount</h1>
              <p>Discount more click here</p>
            </div>

            <h1 className="text-2xl font-bold">5%</h1>
          </div>
        </div>
        <Link to="/discount" onClick={() => handleButtonClick(20)}>20% Discount</Link>
      <Link to="/discount" onClick={() => handleButtonClick(10)}>10% Discount</Link>
      <Link to="/discount" onClick={() => handleButtonClick(5)}>5% Discount</Link>
      {items.map(item => (
        <div key={item.id}>{item.name}</div>
      ))}
      </div>

      <div className="px-4 py-16 mx-auto sm:max-w-xl md:max-w-full lg:max-w-screen-xl md:px-24 lg:px-8 lg:py-20">
        <div className="flex flex-col items-center lg:flex-row">
          <div className="mb-6 lg:mb-0 lg:w-2/5 lg:pr-5">
            <h2 className="mb-5 font-sans text-xl font-bold tracking-tight text-gray-900 sm:text-4xl sm:leading-none">
              জনপ্রিয় ক্যাটাগরি
            </h2>
            <p className="text-2xl font-semibold">
              জনপ্রিয় সব ক্যাটাগরি সমূহ থেকে <br /> বেছে নিন আপনার পছন্দের পণ্য
              টি
            </p>
          </div>
          <div className="lg:w-3/5">
            <div className="container grid grid-cols-3 md:grid-cols-6 px-5">
              <Link to="/category/থ্রি-পিস">
              <div className="card w-28 h-44">
                  <figure>
                    <img
                      className="w-20 h-20 rounded-full"
                      src="https://self-shopping.com/shopapp/img/categoryimage/3_Piece.png"
                      alt="Shoes"
                    />
                  </figure>
                  <div className="card-body">
                    <h2 className="font-semibold text-sm  mx-auto">থ্রি-পিস</h2>
                  </div>
                </div>
              </Link>
              
              <Link to="/category/Mobile Accessories">
                <div className="card w-28 h-44">
                    <figure>
                        <img
                            className="w-16 h-16 rounded-full"
                            src="https://self-shopping.com/shopapp/img/categoryimage/Mobile_Accessories.png"
                            alt="Mobile Accessories"
                        />
                    </figure>
                    <div className="card-body">
                        <h2 className="font-semibold text-sm  mx-auto">
                            Mobile Accessories
                        </h2>
                    </div>
                </div>
            </Link>
            <Link to="/category/চশমা">
            <div className="card w-28 h-44">
                  <figure>
                    <img
                      className="w-16 h-16 rounded-full"
                      src="https://self-shopping.com/shopapp/img/categoryimage/Sun_Glass.png"
                      alt="Shoes"
                    />
                  </figure>
                  <div className="card-body">
                    <h2 className="font-semibold text-sm  mx-auto">চশমা</h2>
                  </div>
                </div>
            </Link>
               
             
                <Link to="/category/ঘড়ি">
                <div className="card w-28 h-44">
                  <figure>
                    <img
                      className="w-16 h-16 rounded-full"
                      src="https://self-shopping.com/shopapp/img/categoryimage/Watch.png"
                      alt="Shoes"
                    />
                  </figure>
                  <div className="card-body">
                    <h2 className="font-semibold text-sm  mx-auto">ঘড়ি</h2>
                  </div>
                </div>
                </Link>
                
             
             <Link to="/category/স্মার্ট ফোন">
             <div className="card w-28 h-44">
                  <figure>
                    <img
                      className="w-16 h-16 rounded-full"
                      src="https://self-shopping.com/shopapp/img/categoryimage/Mobile.png"
                      alt="Shoes"
                    />
                  </figure>
                  <div className="card-body">
                    <h2 className=" font-semibold text-sm  mx-auto">
                      স্মার্ট ফোন
                    </h2>
                  </div>
                </div>
             </Link>  
             <Link to="/category/টি-শার্ট">
             <div className="card w-28 h-44">
                  <figure>
                    <img
                      className="w-16 h-16 rounded-full"
                      src="https://self-shopping.com/shopapp/img/categoryimage/T-Shirt.png"
                      alt="Shoes"
                    />
                  </figure>
                  <div className="card-body">
                    <h2 className="font-semibold text-sm  mx-auto">টি-শার্ট</h2>
                  </div>
                </div>
             </Link>
                
            <Link to="/category/জুতা">
            <div className="card w-28 h-44">
                  <figure>
                    <img
                      className="w-16 h-16 rounded-full"
                      src="https://self-shopping.com/shopapp/img/categoryimage/Shoes.png"
                      alt="Shoes"
                    />
                  </figure>
                  <div className="card-body">
                    <h2 className=" font-semibold text-sm  mx-auto">জুতা</h2>
                  </div>
                </div>
            </Link>
                
                <Link to="/category/শাড়ি">
                <div className="card w-28 h-44">
                  <figure>
                    <img
                      className="w-16 h-16 rounded-full"
                      src="https://self-shopping.com/shopapp/img/categoryimage/Sharee.png"
                      alt="Shoes"
                    />
                  </figure>
                  <div className="card-body">
                    <h2 className="font-semibold text-sm  mx-auto">শাড়ি</h2>
                  </div>
                </div>
                </Link>
                
             
                <Link to="/category/শার্ট">
                <div className="card w-28 h-44">
                  <figure>
                    <img
                      className="w-16 h-16 rounded-full"
                      src="https://self-shopping.com/shopapp/img/categoryimage/Shirt.png"
                      alt="Shoes"
                    />
                  </figure>
                  <div className="card-body">
                    <h2 className="font-semibold text-sm  mx-auto">শার্ট</h2>
                  </div>
                </div>
                </Link>
                
           
                <Link to="/category/ল্যাপটপ">
                <div className="card w-28 h-44">
                  <figure>
                    <img
                      className="w-16 h-16 rounded-full"
                      src="https://self-shopping.com/shopapp/img/categoryimage/Laptop.png"
                      alt="Shoes"
                    />
                  </figure>
                  <div className="card-body">
                    <h2 className="font-semibold text-sm  mx-auto">ল্যাপটপ</h2>
                  </div>
                </div>
                </Link>
                
             
                <Link to="/category/পেন্ট">
                <div className="card w-28 h-44">
                  <figure>
                    <img
                      className="w-16 h-16 rounded-full"
                      src="https://self-shopping.com/shopapp/img/categoryimage/Pant.png"
                      alt="Shoes"
                    />
                  </figure>
                  <div className="card-body">
                    <h2 className="font-semibold text-sm  mx-auto">পেন্ট</h2>
                  </div>
                </div>
                </Link>
                
             
                <Link to="/category/ইলেকট্রনিক্স">
                <div className="card w-28 h-44">
                  <figure>
                    <img
                      className="w-16 h-16 rounded-full"
                      src="https://self-shopping.com/shopapp/img/categoryimage/Electronics.png"
                      alt="Shoes"
                    />
                  </figure>
                  <div className="card-body">
                    <h2 className="font-semibold text-sm  mx-auto">
                      ইলেকট্রনিক্স
                    </h2>
                  </div>
                </div>
                </Link>
               
                <Link to="/category/কিডস">
                <div className="card w-28 h-44">
                  <figure>
                    <img
                      className="w-16 h-16 rounded-full"
                      src="https://self-shopping.com/shopapp/img/categoryimage/Kids.png"
                      alt="Shoes"
                    />
                  </figure>
                  <div className="card-body">
                    <h2 className="font-semibold text-sm  mx-auto">কিডস</h2>
                  </div>
                </div>
                </Link>
                
                <Link to="/category/ডেস্কটপ">
                <div className="card w-28 h-44">
                  <figure>
                    <img
                      className="w-16 h-16 rounded-full"
                      src="https://self-shopping.com/shopapp/img/categoryimage/Desktop.png"
                      alt="Shoes"
                    />
                  </figure>
                  <div className="card-body">
                    <h2 className="font-semibold text-sm  mx-auto">ডেস্কটপ</h2>
                  </div>
                </div>
                </Link>
                
             
                <Link to="/category/কসমেটিক্স">
                <div className="card w-28 h-44">
                  <figure>
                    <img
                      className="w-16 h-16 rounded-full"
                      src="https://self-shopping.com/shopapp/img/categoryimage/Cosmetics.png"
                      alt="Shoes"
                    />
                  </figure>
                  <div className="card-body">
                    <h2 className="font-semibold text-sm  mx-auto">
                      কসমেটিক্স
                    </h2>
                  </div>
                </div>
                </Link>
               
             
                <Link to="/category/গিফট">
                <div className="card w-28 h-44">
                  <figure>
                    <img
                      className="w-16 h-16 rounded-full"
                      src="https://self-shopping.com/shopapp/img/categoryimage/Gift_Box.png"
                      alt="Shoes"
                    />
                  </figure>
                  <div className="card-body">
                    <h2 className=" font-semibold text-sm  mx-auto">গিফট</h2>
                  </div>
                </div>
                </Link>
                
            
            </div>
          </div>
        </div>
      </div>

      <div className="flex justify-between items-center mt-5 px-5">
        <div className="h-14 w-44 bg-yellow-500 rounded-r-full">
          <h1 className="text-black font-normal text-xl mt-3 px-3">
            ফেভারিট প্রোডাক্ট
          </h1>
        </div>

        <Link to='/favorite'><a className="text-xl font-bold text-red-500" href="">
        সকল প্রোডাক্ট 
        </a></Link>
      </div>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-7 gap-2 mt-14 px-5">
        {favorites
          .filter((favorite) => favorite.type === "favoriteProduct")
          .slice(0, 7)
          .map((favorite) => (
            <FavDetails key={favorite._id} favorite={favorite} />
          ))}
      </div>
      {/* <div className="flex justify-between items-center mt-5 px-5">
        <div className="h-14 w-44 bg-yellow-500 rounded-r-full">
          <h1 className="text-black font-normal text-xl mt-3 px-3">
            এক্সক্লুসিভ প্রোডাক্ট
          </h1>
        </div>

        <Link to='/exclusive'><a className="text-xl font-bold text-red-500" href="">
        সকল প্রোডাক্ট 
        </a></Link>
      </div> */}
      {/* <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-7 gap-2 mt-14 px-5">
        {products
          .filter((product) => product.type === "exclusiveProduct")
          .slice(0, 7)
          .map((product) => (
            <ExclusiveDetails key={product._id} product={product} />
          ))}
      </div> */}
      {/* <div className="flex justify-between items-center mt-5 px-5">
        <div className="h-14 w-44 bg-yellow-500 rounded-r-full">
          <h1 className="text-black font-normal text-2xl mt-3 px-3">
            সর্বাধিক বিক্রিত
          </h1>
        </div>

        <Link to='/most'><a className="text-xl font-bold text-red-500" href="">
        সকল প্রোডাক্ট 
        </a></Link>
      </div>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-7 gap-2 mt-14 px-5">
       
          {products
            .filter((product) => product.type === "mostProduct")
            .slice(0, 7)
            .map((product) => (
              <MostDetails key={product._id} product={product} />
            ))}
       
      </div> */}
      {/* <div className="flex justify-between items-center mt-5 px-5">
        <div className="h-14 w-44 bg-yellow-500 rounded-r-full">
          <h1 className="text-black font-normal text-2xl mt-3 px-3">
            ট্রেন্ডিং প্রোডাক্ট
          </h1>
        </div>

        <Link to='/trend'><a className="text-xl font-bold text-red-500" href="">
        সকল প্রোডাক্ট 
        </a></Link>
      </div>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-7 gap-2 mt-14 px-5">
        {products
          .filter((product) => product.type === "trendProduct")
          .slice(0, 7)
          .map((product) => (
            <TradingDEtails key={product._id} product={product} />
          ))}
      </div> */}
      {/* <div className="flex justify-between items-center mt-5 px-5">
        <div className="h-14 w-44 bg-yellow-500 rounded-r-full">
          <h1 className="text-black font-normal text-2xl mt-3 px-3">
            জনপ্রিয় পণ্য
          </h1>
        </div>

        <Link to='/popular'><a className="text-xl font-bold text-red-500" href="">
        সকল প্রোডাক্ট 
        </a></Link>
      </div>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-2 mt-14 px-5">
        {products
          .filter((product) => product.type === "popularProduct")
          .slice(0, 7)
          .map((product) => (
            <PopularDetails key={product._id} product={product} />
          ))}
      </div> */}
      <div className="flex justify-center items-center mt-5 px-5 bg-red-500 h-16">
        <h1 className="text-xl font-bold text-white">
          আপনার প্রয়োজনীয় আরো পণ্য
        </h1>
      </div>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-4 gap-3 mt-14 px-5">
      {products
          .slice(0, 20)
          .map((product) => (
            <AllDetails key={product._id} product={product} />
          ))}
      </div>
    </div>
  );
};

export default Home;
