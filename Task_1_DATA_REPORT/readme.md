# SHUB TECHNOLOGY ENTRY TEST 🚀🚀🚀

-   🙃🙃🙃 Họ và tên ứng viên: Mai Thịnh Phat
-   📪📪📪 GitHub: https://github.com/LeoPkm2-1/

## TASK 1 SOLUTION ✨✨✨

### 1️⃣ KHỞI TẠO DỰ ÁN:

Để khởi tạo project chúng ta sẽ cần chạy lệnh bên dưới để tải các package cần thiết cho ứng dụng:

```console
npm i
```

### 2️⃣ KHỞI ĐỘNG BACKSERVER

Khởi động backserver vui lòng chọn một lệnh trong các lệnh dưới đây:

-   Cho ứng dụng hoạt động ở trạng thái phát triển `(dev mode)` 🧑🏻‍💻🧑🏻‍💻🧑🏻‍💻:

```console
npm run dev
```

-   Cho ứng dụng hoạt động ở trạng thái product ⚙️⚙️⚙️:

```console
npm run start
```

-   Biên dịch file typescript ra mã javascript:

```console
npm run build
```

### 3️⃣ GỬI CÁC REQUEST ĐẾN SERVER:

Sau khi server đã được chạy, chúng ta có thể gửi các yều cầu `(request)` đến server thông qua các api và tham số `(params) `

Server được thiết kế dùng để **upload** và **tính toán tổng Thành tiền của các giao dịch trong một khoảng thời gian** (\<giờ bắt đầu\> \- \<giờ kết thúc \>) trong một ngày của một cửa hàng bán xăng dầu.

Dưới đây sẽ là mô tả chi tiết của các API:

#### 1. API UPLOAD FILE:

-   1.1 Đường dẫn của API:
    `http://localhost:3000/api/upload`

-   1.2 Phương thức: `POST`

-   1.3 Header của gói tin:

    -   Content-Type: `multipart/form-data;`
    -   Connection: `keep-alive`

-   1.4 Tham số :

    -   **_file_** là tham số Có kiểu là _File_, giá trị của nó là tệp tin (file) muốn upload lên server.
    -   **_username_** là tham số Có kiểu là _Text_, giá trị của nó là một chuỗi không dấu mô tả người sở hữu của file tải lên. Nó giống như một cái khóa dùng để phân biệt các người dùng và file của họ với người dùng khác. Những lần truy vấn doanh thu sau này sẽ dựa vào thông tin này để xác định tập tin dữ liệu của người truy vấn.

-   1.5 Giới hạn:

    Hệ thống chỉ chấp nhận upload các file là xlsx và có cấu trúc phần Header và column giống như [file ở Đây](./asset/đề%20bài%20test_report.xlsx)

-   1.6 Chú ý:

    Để tiện lợi hơn trong việc test API, bạn có thể sử dụng công cụ [postman](https://www.postman.com/) và nạp file [postman_collection này](./asset/postman/Shub_test_entry.postman_collection.json) để test


#### 2. API LẤY TỔNG DOANH THU TRONG 1 KHOẢNG THỜI GIAN :

-   2.1 Đường dẫn của API:
    `http://localhost:3000/api/queryRevenue`

-   2.2 Phương thức: `POST`
  
-   2.3 Header của gói tin:

    -   Content-Type: `application/x-www-form-urlencoded`
    -   Connection: `keep-alive`


-   2.4 Tham số :

    -   **_username_** là tham số Có kiểu là _Text_, giá trị của nó là một chuỗi không dấu mô tả người sở hữu của file tải lên.


    - ***startTime*** Là tham số mô tả thời điểm bắt đầu tính doanh thu. Giá trị có là chuỗi mô tả thời gian *(24h)* theo định dạng `HH:mm:ss`
  
    - ***endTime*** Là tham số mô tả thời điểm kết thúc của khoảng thời gian tính doanh thu. Giá trị có là chuỗi mô tả thời gian *(24h)* theo định dạng `HH:mm:ss`

    Doanh thu sẽ được tính trong khoảng thời gian `startTime <=time <=endTime` *(tính cả 2 đầu mút)*


-   2.5 Giới hạn:

    API sẽ trả vễ lỗi nếu như *định dạng thời gian không đúng*, hoặc mô tả *khoảng thời gian không hợp lệ* và cả trong trường hợp người dùng có `username` được mô tả trước đó *chưa tải file lên*


-   2.6 Chú ý:

    Để tiện lợi hơn trong việc test API, bạn có thể sử dụng công cụ [postman](https://www.postman.com/) và nạp file [postman_collection này](./asset/postman/Shub_test_entry.postman_collection.json) để test

