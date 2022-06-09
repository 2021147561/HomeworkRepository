var db = JSON.parse(document.getElementById("dbdata").value);

document.addEventListener("DOMContentLoaded", (() => {
    base(db);
}), false);

function base (data) {
    var product = data;
    init(data);
    function init(data) {
        const itemarea = document.querySelector(".main-div");

        function filtering(e) {
            e.preventDefault();
            // 제품 필터링 (카테고리, 키워드)
            // 입력받은 값 저장
            product = [];
            const type = document.getElementById("category").value;
            const keyword = document.getElementById("search").value;

            console.log(type, keyword);

            // json 파일에서 해당하는 배열 찾기
            if (type == "All") {
                if (keyword == "Search Keywords") { product = data; }
                else {
                    for (let i = 0; i < data.length; i++) {
                        if (data[i].product_contents.toLowerCase().includes(keyword.toLowerCase())) {
                            product.push(data[i]);
                        }
                    }
                }
            }
            else {
                if (keyword == "Search Keywords") {
                    for (let i = 0; i < data.length; i++) {
                        if (data[i].product_category == type.toLowerCase()) { product.push(data[i]); }
                    }
                }
                else {
                    for (let i = 0; i < data.length; i++) {
                        if (data[i].product_category == type.toLowerCase() && data[i].product_contents.toLowerCase().includes(keyword.toLowerCase())) {
                            product.push(data[i]);
                        }
                    }
                }
            }

            // 원하는 개수만큼 보여주기
            reset_items();
            // 결과가 없을 때
            if (product.length == 0) {
                const p = document.createElement('p');
                p.id = "noResult";
                p.innerHTML = "There is no result.";
                itemarea.appendChild(p);
            }
            // 결과가 있을 떄
            show_init(product);
        }


        show_init(data);
        document.querySelector("#search_keywords").onclick = filtering;

        // 제공받은 제품 리스트에서 6개만 보여주기
        function show_init(product) {
            for (let i = 0; i < product.length; i++) {
                if (i < 6) {
                    let div = document.createElement('div');
                    let img = document.createElement('img');
                    
                    div.className = 'item';
                    div.id = 'item ' + product[i].product_title;
                    div.addEventListener('click', newpage);

                    img.id = 'phot ' + product[i].product_title;
                    img.src = product[i].product_image;
                    img.alt = product[i].product_contents;
                    
                    itemarea.appendChild(div);
                    div.appendChild(img);
                }

                function newpage() {
                    window.location.href = './product/:' + product[i].product_id;
                }
            }
        }

        // 현재 main-div의 모든 자식 노드 삭제
        function reset_items() {
            while (itemarea.hasChildNodes()) {
                itemarea.removeChild(itemarea.firstChild);
            }
        }
    }

    window.onscroll = () => {
        if (window.innerHeight + window.scrollY >= document.body.offsetHeight) {
            let elem_num = document.querySelector(".main-div").childElementCount;
            let new_product = product.slice(elem_num);

            for (let i = 0; i < new_product.length; i++) {
                if (i < 6) {
                    let div = document.createElement('div');
                    let img = document.createElement('img');
                    
                    div.className = 'item';
                    div.id = 'item ' + new_product[i].product_title;
                    div.addEventListener('click', newpage);

                    img.id = 'phot ' + new_product[i].product_title;
                    img.src = new_product[i].product_image;
                    img.alt = new_product[i].product_contents;
                    
                    document.querySelector(".main-div").appendChild(div);
                    div.appendChild(img);
                }
                function newpage() {
                    window.location.href = './product/:' + product[i].product_id;
                }
            }
        }
    }
}