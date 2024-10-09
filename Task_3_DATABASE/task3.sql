CREATE DATABASE shub_tech_task_3;
use shub_tech_task_3;


-- bang mo ta tram xang
CREATE TABLE TramXang (
    ma_tram_xang INT PRIMARY KEY,
    ten_tram_xang VARCHAR(50) NOT NULL,
    gio_mo_cua TIME,
    gio_dong_cua TIME,
    ma_so_thue VARCHAR(20) NOT NULL UNIQUE,
    so_nha VARCHAR(32),
    phuong_xa VARCHAR(32),
    thanh_pho VARCHAR(32),
    tinh VARCHAR(32)
);



-- bang mo ta hang hoa
CREATE TABLE HangHoa (
    ma_hang_hoa INT PRIMARY KEY,
    ten_hang_hoa VARCHAR(32) NOT NULL,
    mo_ta_hang_hoa VARCHAR(100),
    don_gia_hien_tai DECIMAL(10, 2)
);



-- bang mo ta tru bom xang
CREATE TABLE TRUBOM(
    ma_tru_bom int NOT NULL,
    ma_tram_xang_quan_ly INT NOT NULL,
    ma_hang_hoa_cung_cap INT NOT NULL,
    ten_tru_bom VARCHAR(32),
    mo_ta_tru_bom VARCHAR(100),
    tong_the_tich DECIMAL(10, 4) NOT NULL,
    the_tich_con_lai DECIMAL(10, 4) NOT NULL,
    trang_thai_tru_bom VARCHAR(20),
    CONSTRAINT CHK_Trang_thai_tru CHECK (
        trang_thai_tru_bom in (
            'ON',
            'OFF',
            'FIXING',
            'FILL_UP'
        )
    ),
    PRIMARY KEY (ma_tru_bom, ma_tram_xang_quan_ly),
    FOREIGN KEY (ma_tram_xang_quan_ly) REFERENCES TramXang(ma_tram_xang),
    FOREIGN KEY (ma_hang_hoa_cung_cap) REFERENCES HangHoa(ma_hang_hoa)
);


-- bang mo ta giao dich
CREATE TABLE GiaoDich (
    ma_giao_dich INT PRIMARY KEY,
    ma_tru_bom int NOT NULL,
    ma_tram_xang_quan_ly INT NOT NULL,
    ma_hang_hoa INT NOT NULL,
    ngay_giao_dich DATETIME,
    so_luong DECIMAL(12, 4) NOT NULL,
    don_gia DECIMAL(12, 3) NOT NULL,
    tong_tien DECIMAL(13, 4) AS (so_luong * don_gia),
    FOREIGN KEY (ma_hang_hoa) REFERENCES HangHoa(ma_hang_hoa),
    FOREIGN KEY(ma_tru_bom, ma_tram_xang_quan_ly) REFERENCES TRUBOM(ma_tru_bom, ma_tram_xang_quan_ly)
);




