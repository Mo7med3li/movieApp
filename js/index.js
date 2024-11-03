// const { data } = require("jquery");

const nameRegex = /^[A-za-z]{0,}$/;
const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
const phoneRegex = /^(\+2)?01[0125][0-9]{8}$/;
const ageRegex = /\b(1[7-9]|[2-9][0-9]|100)\b/;
const passRegex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/;

function showSideBar() {
  $("aside").css({
    left: "0px",
  });
  $(".icons-menu").hide();
  $(".icon-close").show();
}
function hideSideBar() {
  $("aside").css({
    left: "-230px",
  });
  $(".icon-close").hide();
  $(".icons-menu").show();
}
$(".icons-menu").on("click", function () {
  showSideBar();
});
$(".icon-close").on("click", function () {
  hideSideBar();
});

$(".name").on("input", function () {
  regexTest(nameRegex, this);
});
$(".email").on("input", function () {
  regexTest(emailRegex, this);
});
$(".phone").on("input", function () {
  regexTest(phoneRegex, this);
});
$(".age").on("input", function () {
  regexTest(ageRegex, this);
});
$(".pass").on("input", function () {
  regexTest(passRegex, this);
});

$(".repass").on("input", function () {
  if ($(".pass").val() === $(this).val()) {
    $(this).next().hide(200);
    $(this).css({ borderBottomColor: "white" });
    $(".submit-btn").css({
      backgroundColor: "black",
    });
  } else {
    $(this).next().show(200);
    $(this).css({ borderBottomColor: "red" });
    $(".submit-btn").css({
      backgroundColor: "red",
    });
  }
});

function regexTest(regex, input) {
  if (regex.test($(input).val())) {
    $(input).next().hide(200);
    $(input).css({ borderBottomColor: "white" });
    $(".submit-btn").css({
      backgroundColor: "black",
    });

    return true;
  } else {
    $(input).next().show(200);
    $(input).css({ borderBottomColor: "red" });
    $(".submit-btn").css({
      backgroundColor: "red",
    });
    $(".submit-btn").on("mouseenter", function () {
      $(".submit-btn").css({
        translate: "100px",
      });
    });

    return false;
  }
}

async function getMovies() {
  let respone = await fetch(
    "https://api.themoviedb.org/3/trending/all/day?api_key=eba8b9a7199efdcb0ca1f96879b83c44"
  );

  let data = await respone.json();
  console.log(data.results);
  $(".loading").fadeOut(2000, function () {
    $("body").css({
      overflow: "auto",
    });
  });

  dispalyMovies(data.results);

  $(".search-input").on("input", function () {
    search(data.results);
  });
}
getMovies();

function dispalyMovies(array) {
  let box = "";
  for (let i = 0; i < array.length; i++) {
    box += `<div class="col-lg-4 col-md-6 col-sm-12  animate__animated animate__fadeIn">
            <div class="inner-movie position-relative overflow-hidden animate__fadeIn">
              <div class="movie-img animate__fadeIn">
                <img
                  src="https://image.tmdb.org/t/p/w500/${array[i].poster_path}"
                  alt=""
                  class="w-100"
                />
              </div>
              <div class="movie-layer p-3 animate__fadeIn ">
                <h2 class="text-center text-white h1 tittle animate__animated animate__slideOutLeft animate__delay-3s">${
                  array[i].name || array[i].title
                }</h2>
                <p class="text-light py-3 animate__animated animate__slideOutLeft animate__delay-3s">
                  ${array[i].overview}
                </p>
                <p class="text-white fw-light animate__animated animate__slideOutLeft animate__delay-3s">
                  Release Date : <span> ${
                    array[i].release_date || array[i].first_air_date
                  }</span>
                </p>
                <div class="stars py-2 animate__animated animate__slideOutLeft animate__delay-3s">
                  <i class="fa-solid fa-star text-warning"></i>
                  <i class="fa-solid fa-star text-warning"></i>
                  <i class="fa-solid fa-star text-warning"></i>
                </div>
                <p class="rate text-white animate__animated animate__slideOutLeft animate__delay-3s">${
                  array[i].vote_average
                }</p>
              </div>
            </div>
          </div>`;
  }
  $(".movies").html(box);
}

function search(array) {
  let box = "";
  for (let i = 0; i < array.length; i++) {
    if (
      (array[i].title || array[i].name)
        .toLowerCase()
        .includes($(".search-input").val().toLocaleLowerCase())
    ) {
      box += `<div class="col-lg-4 col-md-6 col-sm-12">
                  <div class="inner-movie position-relative overflow-hidden">
                    <div class="movie-img">
                      <img
                        src="https://image.tmdb.org/t/p/w500/${
                          array[i].poster_path
                        }"
                        alt=""
                        class="w-100"
                      />
                    </div>
                    <div class="movie-layer p-3">
                      <h2 class="text-center text-white h1">${
                        array[i].name || array[i].title
                      }</h2>
                      <p class="text-light py-3">
                        ${array[i].overview}
                      </p>
                      <p class="text-white fw-light">
                        Release Date : <span> ${
                          array[i].release_date || array[i].first_air_date
                        }</span>
                      </p>
                      <div class="stars py-2">
                        <i class="fa-solid fa-star text-warning"></i>
                        <i class="fa-solid fa-star text-warning"></i>
                        <i class="fa-solid fa-star text-warning"></i>
                      </div>
                      <p class="rate text-white">${array[i].vote_average}</p>
                    </div>
                  </div>
                </div>`;
    }
    $(".movies").html(box);
  }
}

$(".pass").on("focus", function () {
  if ($(".pass").attr("type") === "password") {
    $(".eyes .eshow").fadeIn(1000);
  }
});
$(".eyes .eshow").on("click", function () {
  $(".pass").attr("type", "text");
  $(this).hide();
  $(".eyes .ehide").fadeIn(1000);
});
$(".eyes .ehide").on("click", function () {
  $(".pass").attr("type", "password");
  $(this).hide();
  $(".eyes .eshow").fadeIn(1000);
});

$(window).on("scroll", function () {
  if ($(window).scrollTop() > "300") {
    $(".scroll-to-top").fadeIn();
  } else {
    $(".scroll-to-top").fadeOut();
  }
});

$(".scroll-to-top").on("click", function () {
  $("html").animate(
    {
      scrollTop: 0,
    },
    1000
  );
});
