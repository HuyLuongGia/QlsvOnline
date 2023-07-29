function hienThiThongTin() {
    var sinhVien = {
        maSv: "",
        tenSv: "",
        loaiSv: "",
        diemToan: 0,
        diemVan: 0,
        tinhDiemTb: function () {
            var dtb = (this.diemToan + this.diemVan) / 2;
            return dtb;
        },
        xepLoai: function () {
            var diemTb = this.tinhDiemTb();
            if (diemTb > 8) {
                return "Giỏi";
            } else if (diemTb <= 8 && diemTb >= 5) {
                return "Khá";
            } else {
                return "Trung Bình";
            }
        },
    };
    sinhVien.maSv = document.getElementById("txtMaSV").value;
    sinhVien.tenSv = document.getElementById("txtTenSV").value;
    sinhVien.loaiSv = document.getElementById("loaiSV").value;
    sinhVien.diemToan = Number(document.getElementById("txtDiemToan").value);
    sinhVien.diemVan = Number(document.getElementById("txtDiemVan").value);

    // Dom tới các thẻ span để hiển thị dữ liệu
    document.getElementById("spanTenSV").innerHTML = sinhVien.tenSv;
    document.getElementById("spanMaSV").innerHTML = sinhVien.maSv;
    document.getElementById("spanLoaiSV").innerHTML = sinhVien.loaiSv;
    document.getElementById("spanDTB").innerHTML = sinhVien.tinhDiemTb();
    document.getElementById("spanXepLoai").innerHTML = sinhVien.xepLoai();
}
