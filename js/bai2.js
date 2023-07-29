var arrInput = [
    "txtMaSV",
    "txtTenSV",
    "txtEmail",
    "txtPass",
    "txtNgaySinh",
    "khSV",
    "txtDiemToan",
    "txtDiemLy",
    "txtDiemHoa",
];

var arrNotiInput = [
    "spanMaSV",
    "spanTenSV",
    "spanEmailSV",
    "spanMatKhau",
    "spanNgaySinh",
    "spanKhoaHoc",
    "spanToan",
    "spanLy",
    "spanHoa",
];

//Mảng arrSinhVien để ở ngoài cùng file vì nếu như để trong function khi chạy hàm sẽ tạo mới mảng, để ngài thì các chức năng khác mới có thể gọi tới và sử dụng được
var arrSinhVien = [];

//Them sinh vien
function themSinhVien() {
    //khi sử dụng onsubmit thì nó có một cơ chế chạy một lệnh get nên sẽ reload lại trang
    //một hàm event.preventDefault() giúp ngăn chặn cơ chế reload lại trang của submit
    event.preventDefault();

    // Tạo ra 1 đối tượng sinh viên từ lớp đối tượng SinhVien
    var sinhVien = new SinhVien();

    // Lấy dữ liệu từ người dùng
    // Cách 1: Dùng vòng lặp
    for (var i = 0; i < arrInput.length; i++) {
        var value = document.getElementById(arrInput[i]).value;
        // arrInput[0] = "txtMaSV"
        sinhVien[arrInput[i]] = value;
    }
    // Tạo ra một biến check dữ liệu
    var valid = true;
    for (var z = 0; z < arrInput.length; z++) {
        if (sinhVien[arrInput[z]] == "") {
            valid = false;
            document.getElementById(arrNotiInput[z]).innerHTML =
                "Vui lòng nhập dữ liệu";
        } else {
            document.getElementById(arrNotiInput[z]).innerHTML = "";
        }
    }

    // Tạo biến lưu trữ regex
    // Validation Email
    var regexEmail =
        /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
    if (sinhVien["txtEmail"] !== "") {
        // Nếu dữ liệu chuẩn là email thì khi check nó sẽ trả về là true
        // Nếu dữ liệu không phải là email thì khi check nó sẽ trả về là false
        if (regexEmail.test(sinhVien["txtEmail"])) {
            document.getElementById("spanEmailSV").innerHTML = "";
        } else {
            document.getElementById("spanEmailSV").innerHTML =
                "Định dạng email không đúng";
        }
    }

    //dùng valid để check nếu valid false tức nghĩa vẫn đang bị lỗi sẽ không thêm dữ liệu vào, true thì ngược lại
    if (valid) {
        arrSinhVien.push(sinhVien);
        luuDuLieuLocal();
        renderGiaoDien();
        // Clear các dữ liệu bên trên input khi một sinh viên được thêm thành công
        document.getElementById("formQLSV").reset();
    }
}

function xoaSinhVien(maSv) {
    console.log(maSv);
    var index = -1;
    for (var i = 0; i < arrSinhVien.length; i++) {
        if (arrSinhVien[i].txtMaSV == maSv) {
            index = i;
        }
    }
    arrSinhVien.splice(index, 1);
    luuDuLieuLocal();
    console.log(arrSinhVien);
    renderGiaoDien();
}

function layThongTinSinhVien(maSv) {
    // Vòng lặp để lấy được object thỏa mãn sinh viên
    var sinhVien = {};
    for (var i = 0; i < arrSinhVien.length; i++) {
        if (arrSinhVien[i].txtMaSV == maSv) {
            sinhVien = arrSinhVien[i];
        }
    }
    //Lấy dữ liệu từ sinh viên và gán lên các input
    for (var z = 0; z < arrInput.length; z++) {
        document.getElementById(arrInput[z]).value = sinhVien[arrInput[z]];
        document.getElementById(arrNotiInput[z]).innerHTML = "";
    }
    // Chỉnh thuộc tính readonly cho input maSv chặn người dùng sửa
    document.getElementById("txtMaSV").readOnly = true;
    document.getElementById("btnCapNhat").style.display = "inline-block";
}

function capNhatSinhVien() {
    // Lấy dữ liệu từ người dùng về
    var sinhVien = new SinhVien();
    for (var i = 0; i < arrInput.length; i++) {
        var value = document.getElementById(arrInput[i]).value;
        sinhVien[arrInput[i]] = value;
    }
    // Tìm kiếm tới vị trí của dữ liệu sinh viên cũ đang đứng
    for (var z = 0; z < arrSinhVien.length; z++) {
        if (sinhVien.txtMaSV == arrSinhVien[z].txtMaSV) {
            arrSinhVien[z] = sinhVien;
            // Mở lại input maSv;
            document.getElementById("txtMaSV").readOnly = false;
            // Cập nhật xong clear hết dữ liệu input
            document.getElementById("formQLSV").reset();
            // Gọi render để cập nhật lại dữ liệu mới nhất lên giao diện
            renderGiaoDien();
            luuDuLieuLocal();
            // Khi cập nhật xong, display none cho nút cập nhật
            document.getElementById("btnCapNhat").style.display = "none";
        }
    }
}

document.getElementById("btnCapNhat").addEventListener("click", function () {
    capNhatSinhVien();
});

function renderGiaoDien() {
    // sau khi thêm sinhVien vào mảng sẽ chạy một vòng lặp để hiển thị dữ liệu lên người dùng
    var content = "";
    for (var i = 0; i < arrSinhVien.length; i++) {
        var sinhVien = arrSinhVien[i];
        // ở trong vòng lặp vì dữ liệu arrSinhVien[i] nó được lấy lên từ local mà các object được lưu xuống local bị mất đi phương thức nên sinhVien.tinhDTB sẽ bị lỗi
        var newSinhVien = new SinhVien();
        //object.assign giúp clone (truyền dữ liệu)
        //object.asign có 2 tham số, tham số 1 là đối tượng muốn nhận dữ liệu, tham số 2 là đối tượng muốn cho dữ liệu
        Object.assign(newSinhVien, sinhVien);

        console.log(arrSinhVien[i]);
        content += `
        <tr>
            <td>${newSinhVien.txtMaSV}</td>
            <td>${newSinhVien.txtTenSV}</td>
            <td>${newSinhVien.txtEmail}</td>
            <td>${newSinhVien.txtNgaySinh}</td>
            <td>${newSinhVien.khSV}</td>
            <td>${newSinhVien.tinhDTB()}</td>
            <td>
            <button class="btn btn-danger" onclick="xoaSinhVien('${
                newSinhVien.txtMaSV
            }')">Xóa</button>
            <button class="btn btn-info" onclick="layThongTinSinhVien('${
                newSinhVien.txtMaSV
            }')">Sửa</button>
            </td>
        </tr>
        `;
    }
    console.log(content);
    //Dom tới tbodySinhVien
    document.getElementById("tbodySinhVien").innerHTML = content;
}

// ?Demo về tương tác với localStorage
//? Phương thức setItem giúp thêm dữ liệu vào localstorage
//? Tham số đầu tiên sẽ là tên của dữ liệu cần lưu xuống local, tham số thứ 2 là giá trị muốn lưu xuống
//? Chuyển đổi array hoặc object thành một chuỗi JSON trước khi lưu xuống local
// var stringSinhVien = JSON.stringify({
//     hoTen: "Cường",
// });
// localStorage.setItem("Họ Tên", stringSinhVien);
// localStorage.setItem("họ tên", "Tấn Khải");

//?Phương thức getItem giúp lấy dữ liệu từ local
//?Tham số nhận vào sẽ là tên key muốn lấy
// var hoTen = localStorage.getItem("Họ Tên");
// console.log(hoTen);
//? JSON.parse để chuyển đổi json thành định dạng dữ liệu ban đầu
// var objectHoTen = JSON.parse(hoTen);
// console.log(objectHoTen);

//? Phương thức removeItem giúp xóa đi dữ liệu lưu trữ dưới local
// localStorage.removeItem("họ tên");

function luuDuLieuLocal() {
    // chuyển mảng thành dạng dữ liệu json.stringify trước khi lưu
    var newArrSinhVien = JSON.stringify(arrSinhVien);
    localStorage.setItem("arrSinhVien", newArrSinhVien);
}

function layDuLieuLocal() {
    var arr = localStorage.getItem("arrSinhVien");
    // Lưu ý khi gọi dữ liệu từ local lên thì các bạn lưu ý đó là khi dưới local không có key mà chúng ta cần tìm thì giá trị nhận được sẽ là null
    if (arr != null) {
        //Chuyển đổi dữ liệu về lại kiểu dữ liệu ban đầu
        var newArr = JSON.parse(arr);
        // Vì các phương thức xử lý thêm xóa đều tác động vào arrSinhVien nhưng khi mới reload trang thì giá trị của arrSinhVien là [] nên ta gán mảng dưới local lên lại cho arrSinhVien
        arrSinhVien = newArr;
        renderGiaoDien();
    }
}
layDuLieuLocal();
console.log(arrSinhVien);
