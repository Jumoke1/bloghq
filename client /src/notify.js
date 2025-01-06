import toastr from "toastr";

function Notify (message, type, title){
    toastr.options = {
        closeButton: true,
        debug: false,
        newestOnTop: false,
        progressBar: true,
        positionClass: "toast-top-right",
        preventDuplicates: false,
        showEasing: "swing",
        hideEasing: "linear",
        showMethod: "slideDown",
        hideMethod: "fadeOut",
    };
    console.log("todo")
    switch (type) {
        case "info":
            toastr.info(message, title);
            break;
        case "warning":
            toastr.warning(message, title);
            break;
        case "error":
            toastr.error(message, title);
            break;
        case "success":
            toastr.success(message, title);
            console.log("succcess")
            break;
        default:
            toastr.info(message, title);
            break;
    }


}

export default Notify
