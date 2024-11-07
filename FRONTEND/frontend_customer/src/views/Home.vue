<script setup>

</script>

<template>
    <main class="container">
        <!-- Hi THERE -->
        <div class="row">
            <div class="imghi col-md-5 mt-5">
                <img src="../assets/images/header/lam-qua-giang-sinh.jpg" alt="">
            </div>

            <div class="hithere col-md rounded-5">
                <p><span>Chào mừng bạn đến với Memoris!</span><br>
                    Chúng tôi tự hào là điểm đến hàng đầu của bạn để tìm kiếm những món quà lưu niệm độc đáo và ý nghĩa. Tại
                    Memoris, mỗi sản phẩm chúng tôi chọn lọc đều mang một câu chuyện, một kỷ niệm đẹp và là cách hoàn hảo để
                    ghi dấu những khoảnh khắc quý giá trong cuộc số.
                </p>
            </div>
        </div>
        <!-- CATEGORY -->
        <div class="row mt-5 b">
            
            <div class="col-md">
                <div id="carouselExampleCaptions" class="carousel slide">
                    <div class="carousel-indicators">
                        <button type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide-to="0" class="active"
                            aria-current="true" aria-label="Slide 1"></button>
                        <button type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide-to="1"
                            aria-label="Slide 2"></button>
                        <button type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide-to="2"
                            aria-label="Slide 3"></button>
                    </div>
                    <div class="carousel-inner">
                        <div class="carousel-item active ">
                            <img src="../assets/images/products/category-candle.jpg" class="d-block w-100 shadow-sm rounded"
                                alt="...">
                            <div class="carousel-caption d-none d-md-block">
                                <h5>First slide label</h5>
                                <p>Some representative placeholder content for the first slide.</p>
                            </div>
                        </div>
                        <div class="carousel-item">
                            <img src="../assets/images/products/category-card.jpg" class="d-block w-100 shadow-sm rounded"
                                alt="...">
                            <div class="carousel-caption d-none d-md-block">
                                <h5>Second slide label</h5>
                                <p>Some representative placeholder content for the second slide.</p>
                            </div>
                        </div>
                        <div class="carousel-item">
                            <img src="../assets/images/products/category-socks.png" class="d-block w-100 shadow-sm rounded"
                                alt="...">
                            <div class="carousel-caption d-none d-md-block">
                                <h5>Third slide label</h5>
                                <p>Some representative placeholder content for the third slide.</p>
                            </div>
                        </div>
                    </div>
                    <button class="carousel-control-prev" type="button" data-bs-target="#carouselExampleCaptions"
                        data-bs-slide="prev">
                        <span class="carousel-control-prev-icon" aria-hidden="true"></span>
                        <span class="visually-hidden">Previous</span>
                    </button>
                    <button class="carousel-control-next" type="button" data-bs-target="#carouselExampleCaptions"
                        data-bs-slide="next">
                        <span class="carousel-control-next-icon" aria-hidden="true"></span>
                        <span class="visually-hidden">Next</span>
                    </button>
                </div>
            </div>
        </div>
        <!-- SHARE -->
        <div class="Share">
            <h1>Share</h1>
            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque id est hendrerit purus cursus maximus
                dignissim laoreet orci. Duis ut luctus leo, eu viverra nisl. Sed lobortis ultricies pharetra. Proin non
                erat
                quam. Donec ullamcorper pretium gravida. Quisque porttitor hendrerit lorem sagittis suscipit. Class
                aptent
                taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Fusce pretium mollis
                molestie. Duis dictum, purus sit amet auctor sollicitudin, lectus ligula laoreet tellus, interdum
                scelerisque lacus augue sed odio. Cras a massa justo. Nam a urna quam. Nunc condimentum, velit vel
                mattis
                sodales, nisl justo faucibus nunc, nec dapibus orci arcu nec felis. Phasellus ac tortor pulvinar,
                posuere
                orci vitae, varius eros. Curabitur faucibus molestie lectus, vitae commodo tellus vulputate et.
                Sed hendrerit luctus leo, sed semper magna dictum sit amet. Mauris rhoncus accumsan purus nec congue.
                Vestibulum finibus nisl aliquam justo accumsan pellentesque. Ut ut accumsan risus. Aenean dignissim
                commodo
                tortor. Nullam cursus nisi venenatis elit finibus, consequat egestas ipsum condimentum. Morbi nec nibh
                mollis diam convallis consectetur. Pellentesque laoreet tincidunt mi, ac facilisis lectus ornare id.
            </p>
        </div>
    </main>
</template>

<style scoped>
.carousel-item img {
    max-height: 400px;
    /* Example height */
    width: auto;
    object-fit: cover;
    /* Optional, based on your design */
}</style>
