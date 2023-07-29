function SinhVien() {
    this.txtMaSV = "";
    this.txtTenSV = "";
    this.txtEmail = "";
    this.txtPass = "";
    this.txtNgaySinh = "";
    this.khSV = "";
    this.txtDiemToan = 0;
    this.txtDiemLy = 0;
    this.txtDiemHoa = 0;
    //Phuong thuc
    this.tinhDTB = function () {
        var dtb =
            (Number(this.txtDiemHoa) +
                Number(this.txtDiemLy) +
                Number(this.txtDiemToan)) /
            3;
        return dtb.toLocaleString();
    };
}
