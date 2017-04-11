var app = angular.module("myBlog",[]);
app.controller("myController", function($scope){

	$scope.blogs = [
	{
		blog: "Sushi Tokumi",
		image: "images/Blog/SushiTokumi.jpg",
		description: "Super satisfied dinner",
    url: "blog01.html"
	},

	{
		blog: "Inspiration Lake Recreation Centre",
		image: "images/Blog/Inspiration.jpg",
		description: "Explore the lush garden of flowers and plants"

	},
	{
		blog: "Tino's pizza cafe",
		image: "images/Blog/Tinos.jpg",
		description: "A choice between fast food and Italian restaurant"
	},
	{
		blog: "Oyster station",
		image: "images/Blog/Oyster.jpg",
		description: "HK$10 oysters"

	},
	{
		blog: "Lamma Island",
		image: "images/Blog/LammaIsland.jpg",
		description: "Day trip to Lamma Island"

	},
	{
		blog: "Yim Tin Tsai Village",
		image: "images/Blog/YimTinTsaiVillage.jpg",
		description: "The most suitable for the exploration of the hidden angle of the mountains of the influx of people"
	},
	{
		blog: "Xia Mian Guan",
		image: "images/Blog/XiaMianGuan.jpg",
		description: "Interesting!Giant Noodles"
	},
	{
		blog: "Needle Hill",
		image: "images/Blog/NeedleHill.jpg",
		description: "Challenge the top of the mountain in Tsuen Wan - Needle Hill"
	},
	{
		blog: "Harbour Restaurant",
		image: "images/Blog/HarbourRestaurant.jpg",
		description: "Sai-Wan Travel, Cannot miss the 8 major shadow phase!!"
	}
  ];

});
