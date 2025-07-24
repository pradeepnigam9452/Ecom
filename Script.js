
        let bag =[];
        let originalBag =[];
        let cart = JSON.parse(localStorage.getItem("cartarr")) || [];
        // 1. get the data
        let api = fetch("https://fakestoreapi.com/products")
                    .then((res)=> res.json())
                    .then((data)=>{
                        console.log(data);
                        displayCard(data);
                        bag= data;
                         originalBag = [...data];
                    })
                    .catch((err) => console.log(err.message));
                
        // 2. Create cart
        function displayCard(arr){
            document.querySelector(".cont").innerText=""
            arr.forEach((ele) => {
                const box = document.createElement("div");
                box.classList.add("box");

                const image = document.createElement("img");
                image.setAttribute("src",ele.image);

                const title = document.createElement("h3");
                title.innerText =`Title: ${ele.title}`;

                const description = document.createElement("p");
                description.innerText =`Description: ${ele.description}`;

                const category = document.createElement("h4");
                category.innerText =`Category: ${ele.category}`;

                const price = document.createElement("button");
                price.innerText =`Price: ${ele.price}`;

                const rating = document.createElement("button");
                rating.innerText =`Rating: ${ele.rating.rate}`;

                const add = document.createElement("button");
                add.innerText =`Add to Cart`;

                add.addEventListener("click",function (){
                    cart.push(ele);
                    localStorage.setItem("cartarr", JSON.stringify(cart))
                })


                box.append(image, title, description, category, price, rating, add);
                document.querySelector(".cont").append(box);
            });
        }

        function sch(){
            const query = document.querySelector("#search").value;
            console.log(query);

            let searcedArr = bag.filter((ele)=>{
                return ele.title.toLowerCase().includes(query.toLowerCase());
            })
            displayCard(searcedArr);
            console.log(searcedArr);
        }
        function sort(){
            const query = document.querySelector("#price").value;
            if(query == "Low to High"){
                let sortedasc = bag.sort((a,b) => a.price - b.price);
                console.log(sortedasc);
                displayCard(sortedasc);
            }else if(query == "High to Low"){
                let sorteddsc = bag.sort((b,a) => a.price - b.price);
                displayCard(sorteddsc);
            }else{
                displayCard(originalBag);
            }
        }
    