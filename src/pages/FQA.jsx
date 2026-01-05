import { Icon } from '@iconify/react';
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

export default function FAQ() {

    useEffect(() => {
        window.scrollTo({
            top: 0,
            left: 0,
            behavior: "smooth",
        });
    }, []);

    const [activeCategory, setActiveCategory] = useState('orders');

    const categories = {
        orders: {
            title: 'Đơn hàng & Thanh toán',
            count: 5,
            questions: [
                {
                    q: 'Làm thế nào để theo dõi đơn hàng đồng hồ của tôi?',
                    a: (
                        <div>
                            <p className="mb-3">Sau khi đơn hàng của bạn được xử lý và giao cho đơn vị vận chuyển, bạn sẽ nhận được email xác nhận kèm mã theo dõi đơn hàng.</p>
                            <p className="mb-3">Bạn có thể theo dõi đơn hàng bằng cách:</p>
                            <ul className="list-disc list-inside space-y-1 mb-3 pl-2 marker:text-[#00bcd4]">
                                <li>Nhấp vào liên kết trong email xác nhận vận chuyển.</li>
                                <li>Truy cập trang <Link className="text-[#00bcd4] hover:underline" to="#">Tra cứu đơn hàng</Link> và nhập mã đơn hàng của bạn.</li>
                                <li>Đăng nhập vào tài khoản và xem mục 'Lịch sử đơn hàng'.</li>
                            </ul>
                            <p>Vui lòng đợi 24-48 giờ để thông tin vận chuyển được cập nhật sau khi nhận email.</p>
                        </div>
                    )
                },
                {
                    q: 'Các phương thức thanh toán nào được chấp nhận?',
                    a: 'Chúng tôi chấp nhận tất cả các thẻ tín dụng phổ biến (Visa, MasterCard, American Express, JCB), ví điện tử (MoMo, ZaloPay, VNPay), chuyển khoản ngân hàng và thanh toán khi nhận hàng (COD) cho đơn hàng dưới 50 triệu đồng. Đối với một số sản phẩm cao cấp, chúng tôi còn hỗ trợ trả góp 0% qua thẻ tín dụng.'
                },
                {
                    q: 'Tôi có thể thay đổi hoặc hủy đơn hàng sau khi đặt không?',
                    a: (
                        <div>
                            <p className="mb-2">Chúng tôi xử lý đơn hàng nhanh chóng để đảm bảo giao hàng sớm. Bạn có <strong>1 giờ</strong> sau khi đặt hàng để thay đổi hoặc hủy đơn trực tiếp từ tài khoản của mình.</p>
                            <p>Sau thời gian này, đơn hàng sẽ được chuyển đến kho. Nếu bạn bỏ lỡ thời gian này, vui lòng đợi nhận hàng và thực hiện <Link className="text-[#00bcd4] hover:underline" to="#">Quy trình đổi trả</Link> của chúng tôi.</p>
                        </div>
                    )
                },
                {
                    q: 'Có giao hàng quốc tế không?',
                    a: 'Có, chúng tôi giao hàng đến hơn 50 quốc gia trên thế giới. Chi phí vận chuyển quốc tế được tính tại trang thanh toán dựa trên vị trí và trọng lượng đơn hàng của bạn. Lưu ý rằng thuế quan và phí nhập khẩu là trách nhiệm của khách hàng và không được tính trong giá vận chuyển.'
                },
                {
                    q: 'Chuyện gì xảy ra nếu thanh toán của tôi bị từ chối?',
                    a: 'Nếu thanh toán bị từ chối, vui lòng kiểm tra thông tin thẻ và số dư tài khoản. Bạn có thể cần liên hệ ngân hàng để xác nhận giao dịch. Nếu vấn đề vẫn tiếp diễn, hãy thử sử dụng phương thức thanh toán khác như ví điện tử hoặc chuyển khoản ngân hàng.'
                }
            ]
        },
        shipping: {
            title: 'Vận chuyển & Giao hàng',
            count: 6,
            questions: [
                {
                    q: 'Thời gian giao hàng là bao lâu?',
                    a: (
                        <div>
                            <p className="mb-3">Thời gian giao hàng phụ thuộc vào địa chỉ của bạn:</p>
                            <ul className="list-disc list-inside space-y-1 mb-3 pl-2 marker:text-[#00bcd4]">
                                <li><strong>Nội thành Hà Nội & TP.HCM:</strong> 1-2 ngày làm việc</li>
                                <li><strong>Các tỉnh thành khác:</strong> 2-4 ngày làm việc</li>
                                <li><strong>Vùng xa, miền núi:</strong> 4-7 ngày làm việc</li>
                                <li><strong>Quốc tế:</strong> 7-14 ngày làm việc</li>
                            </ul>
                            <p>Đơn hàng được xử lý từ thứ 2 đến thứ 6 (không tính thứ 7, chủ nhật và ngày lễ).</p>
                        </div>
                    )
                },
                {
                    q: 'Chi phí vận chuyển là bao nhiêu?',
                    a: (
                        <div>
                            <p className="mb-3">Chi phí vận chuyển phụ thuộc vào giá trị đơn hàng:</p>
                            <ul className="list-disc list-inside space-y-1 pl-2 marker:text-[#00bcd4]">
                                <li><strong>Miễn phí:</strong> Đơn hàng từ 5 triệu đồng trở lên</li>
                                <li><strong>30.000đ:</strong> Nội thành Hà Nội & TP.HCM (đơn dưới 5 triệu)</li>
                                <li><strong>50.000đ:</strong> Các tỉnh thành khác</li>
                                <li><strong>Chi phí thực tế:</strong> Vùng xa, miền núi và quốc tế</li>
                            </ul>
                        </div>
                    )
                },
                {
                    q: 'Tôi có thể chỉ định thời gian giao hàng cụ thể không?',
                    a: 'Có, chúng tôi hỗ trợ chỉ định khung giờ giao hàng (sáng 8h-12h hoặc chiều 14h-18h) cho các đơn hàng tại nội thành Hà Nội và TP.HCM. Vui lòng ghi chú yêu cầu của bạn khi đặt hàng hoặc liên hệ hotline để được hỗ trợ.'
                },
                {
                    q: 'Điều gì xảy ra nếu không có người nhận hàng?',
                    a: 'Nếu không có người nhận, đơn vị vận chuyển sẽ liên hệ với bạn để sắp xếp lại lịch giao hàng. Đơn hàng sẽ được lưu tại bưu cục trong 3 ngày. Sau thời gian này, hàng sẽ được trả về kho và bạn cần thanh toán phí vận chuyển 2 chiều để giao lại.'
                },
                {
                    q: 'Tôi có thể thay đổi địa chỉ giao hàng sau khi đặt không?',
                    a: 'Bạn có thể thay đổi địa chỉ trong vòng 2 giờ sau khi đặt hàng bằng cách liên hệ hotline hoặc chat trực tuyến. Sau khi đơn hàng được chuyển đến đơn vị vận chuyển, chúng tôi không thể thay đổi địa chỉ được nữa.'
                },
                {
                    q: 'Kiện hàng có được bảo hiểm không?',
                    a: 'Có, tất cả đơn hàng đồng hồ của chúng tôi đều được bảo hiểm toàn bộ trong quá trình vận chuyển. Nếu có bất kỳ hư hỏng nào, vui lòng chụp ảnh và liên hệ ngay với chúng tôi trong vòng 24 giờ kể từ khi nhận hàng để được hỗ trợ đổi mới hoặc hoàn tiền.'
                }
            ]
        },
        returns: {
            title: 'Đổi trả & Hoàn tiền',
            count: 7,
            questions: [
                {
                    q: 'Chính sách đổi trả như thế nào?',
                    a: (
                        <div>
                            <p className="mb-3">Chúng tôi chấp nhận đổi trả trong vòng <strong>30 ngày</strong> kể từ ngày nhận hàng với các điều kiện:</p>
                            <ul className="list-disc list-inside space-y-1 mb-3 pl-2 marker:text-[#00bcd4]">
                                <li>Sản phẩm còn nguyên seal, chưa qua sử dụng</li>
                                <li>Đầy đủ hộp, phụ kiện, giấy tờ đi kèm</li>
                                <li>Không có dấu hiệu trầy xước, hư hỏng</li>
                                <li>Có hóa đơn mua hàng gốc</li>
                            </ul>
                            <p className="text-sm italic">Lưu ý: Đồng hồ đã khắc chữ hoặc tùy chỉnh theo yêu cầu không được đổi trả.</p>
                        </div>
                    )
                },
                {
                    q: 'Làm thế nào để đổi trả sản phẩm?',
                    a: (
                        <div>
                            <p className="mb-3">Quy trình đổi trả đơn giản:</p>
                            <ol className="list-decimal list-inside space-y-2 mb-3 pl-2">
                                <li>Đăng nhập tài khoản và tạo yêu cầu đổi trả từ mục 'Đơn hàng của tôi'</li>
                                <li>Chọn lý do đổi trả và tải lên hình ảnh sản phẩm</li>
                                <li>Đóng gói sản phẩm cẩn thận (giữ nguyên hộp và phụ kiện)</li>
                                <li>Giao hàng cho đơn vị vận chuyển của chúng tôi đến lấy (miễn phí)</li>
                                <li>Sau khi nhận và kiểm tra, chúng tôi sẽ hoàn tiền trong 3-5 ngày làm việc</li>
                            </ol>
                        </div>
                    )
                },
                {
                    q: 'Tôi có thể đổi sang sản phẩm khác không?',
                    a: 'Có, bạn hoàn toàn có thể đổi sang sản phẩm khác có giá trị tương đương hoặc cao hơn (chỉ cần bù thêm phần chênh lệch). Vui lòng ghi rõ sản phẩm muốn đổi trong yêu cầu hoặc liên hệ bộ phận chăm sóc khách hàng để được tư vấn.'
                },
                {
                    q: 'Mất bao lâu để nhận được hoàn tiền?',
                    a: (
                        <div>
                            <p className="mb-3">Thời gian hoàn tiền phụ thuộc vào phương thức thanh toán ban đầu:</p>
                            <ul className="list-disc list-inside space-y-1 pl-2 marker:text-[#00bcd4]">
                                <li><strong>Ví điện tử:</strong> 1-2 ngày làm việc</li>
                                <li><strong>Chuyển khoản ngân hàng:</strong> 3-5 ngày làm việc</li>
                                <li><strong>Thẻ tín dụng:</strong> 5-10 ngày làm việc (tùy ngân hàng)</li>
                                <li><strong>COD:</strong> Chuyển khoản trong 3-5 ngày sau khi nhận hàng trả</li>
                            </ul>
                        </div>
                    )
                },
                {
                    q: 'Chi phí vận chuyển khi đổi trả ai chịu?',
                    a: 'Nếu sản phẩm bị lỗi từ nhà sản xuất hoặc giao sai hàng, chúng tôi sẽ chịu toàn bộ phí vận chuyển 2 chiều. Nếu đổi trả vì lý do cá nhân (không vừa, không thích), khách hàng chịu phí vận chuyển trả hàng, chúng tôi miễn phí giao hàng mới.'
                },
                {
                    q: 'Sản phẩm sale/khuyến mãi có được đổi trả không?',
                    a: 'Có, sản phẩm sale/khuyến mãi vẫn được áp dụng chính sách đổi trả trong vòng 30 ngày như sản phẩm giá gốc. Tuy nhiên, số tiền hoàn lại sẽ là giá thực tế bạn đã thanh toán (giá sau giảm), không phải giá gốc.'
                },
                {
                    q: 'Tôi đã mở seal nhưng chưa đeo, có được trả không?',
                    a: 'Sản phẩm đã mở seal nhưng chưa qua sử dụng (còn nguyên màng bảo vệ, không trầy xước) vẫn có thể đổi trả. Tuy nhiên, chúng tôi sẽ cần kiểm tra kỹ tình trạng sản phẩm. Nếu có dấu hiệu đã đeo hoặc sử dụng, yêu cầu đổi trả có thể bị từ chối.'
                }
            ]
        },
        warranty: {
            title: 'Sản phẩm & Bảo hành',
            count: 8,
            questions: [
                {
                    q: 'Đồng hồ có được bảo hành bao lâu?',
                    a: (
                        <div>
                            <p className="mb-3">Thời gian bảo hành phụ thuộc vào thương hiệu và dòng sản phẩm:</p>
                            <ul className="list-disc list-inside space-y-1 mb-3 pl-2 marker:text-[#00bcd4]">
                                <li><strong>Đồng hồ Thụy Sỹ cao cấp:</strong> 2-5 năm bảo hành quốc tế</li>
                                <li><strong>Đồng hồ Nhật Bản:</strong> 1-2 năm bảo hành toàn cầu</li>
                                <li><strong>Đồng hồ thời trang:</strong> 1 năm bảo hành chính hãng</li>
                                <li><strong>Đồng hồ thông minh:</strong> 1 năm (pin 6 tháng)</li>
                            </ul>
                            <p className="text-sm">Tất cả sản phẩm đều kèm phiếu bảo hành quốc tế chính thức từ hãng.</p>
                        </div>
                    )
                },
                {
                    q: 'Bảo hành bao gồm những gì?',
                    a: (
                        <div>
                            <p className="mb-3"><strong>Được bảo hành:</strong></p>
                            <ul className="list-disc list-inside space-y-1 mb-3 pl-2 marker:text-[#00bcd4]">
                                <li>Lỗi bộ máy, cơ chế vận hành</li>
                                <li>Lỗi kim, số, mặt số</li>
                                <li>Lỗi vỏ, mặt kính (không do va đập)</li>
                                <li>Lỗi chống nước (trong điều kiện bình thường)</li>
                            </ul>
                            <p className="mb-3"><strong>Không được bảo hành:</strong></p>
                            <ul className="list-disc list-inside space-y-1 pl-2 marker:text-red-500">
                                <li>Hư hỏng do va đập, rơi, vỡ</li>
                                <li>Trầy xước thẩm mỹ, hao mòn tự nhiên</li>
                                <li>Pin, dây da, dây cao su</li>
                                <li>Sửa chữa tại nơi không được ủy quyền</li>
                            </ul>
                        </div>
                    )
                },
                {
                    q: 'Làm thế nào để yêu cầu bảo hành?',
                    a: (
                        <div>
                            <p className="mb-3">Bạn có thể yêu cầu bảo hành bằng 2 cách:</p>
                            <ol className="list-decimal list-inside space-y-2 pl-2">
                                <li><strong>Mang trực tiếp đến cửa hàng:</strong> Mang đồng hồ và phiếu bảo hành đến bất kỳ showroom nào của chúng tôi để được kiểm tra và xử lý ngay</li>
                                <li><strong>Gửi qua đường bưu điện:</strong> Liên hệ hotline để được hướng dẫn đóng gói và gửi (chúng tôi chịu phí vận chuyển 2 chiều)</li>
                            </ol>
                            <p className="mt-3 text-sm italic">Thời gian bảo hành: 7-30 ngày tùy mức độ hư hỏng và thương hiệu.</p>
                        </div>
                    )
                },
                {
                    q: 'Tôi có được đồng hồ thay thế trong khi bảo hành không?',
                    a: 'Đối với bảo hành kéo dài trên 14 ngày, chúng tôi cung cấp dịch vụ cho mượn đồng hồ tạm thời (cùng phân khúc) nếu bạn đăng ký trước. Dịch vụ này hoàn toàn miễn phí, bạn chỉ cần đặt cọc 30% giá trị sản phẩm.'
                },
                {
                    q: 'Đồng hồ hết bảo hành có được sửa chữa không?',
                    a: 'Có, chúng tôi cung cấp dịch vụ bảo dưỡng và sửa chữa trọn đời cho tất cả sản phẩm đã mua tại cửa hàng, kể cả sau khi hết thời gian bảo hành chính hãng. Chi phí sửa chữa sẽ được báo giá chi tiết sau khi kiểm tra và cần sự đồng ý của bạn trước khi thực hiện.'
                },
                {
                    q: 'Đồng hồ chống nước bị vào nước có được bảo hành?',
                    a: 'Nếu đồng hồ vào nước trong điều kiện sử dụng đúng theo chỉ số chống nước của sản phẩm (ví dụ: 5ATM - rửa tay, 10ATM - bơi lội), trường hợp này được bảo hành. Tuy nhiên, nếu vào nước do làm rơi hoặc sử dụng sai mục đích (ví dụ: đeo đồng hồ 3ATM đi bơi), trường hợp này không được bảo hành.'
                },
                {
                    q: 'Tôi có thể bảo dưỡng định kỳ ở đâu?',
                    a: 'Tất cả các showroom của chúng tôi đều cung cấp dịch vụ bảo dưỡng cơ bản miễn phí (lau dầu, kiểm tra độ chống nước, thay pin) trong năm đầu. Sau đó, bạn có thể sử dụng dịch vụ bảo dưỡng toàn diện với chi phí ưu đãi 30-50% so với giá thị trường.'
                },
                {
                    q: 'Sản phẩm có được xác thực chính hãng không?',
                    a: 'Tất cả sản phẩm tại WatchStore đều là hàng chính hãng 100% được nhập khẩu trực tiếp từ các nhà phân phối ủy quyền. Mỗi sản phẩm đều có mã số riêng có thể kiểm tra trên website hãng, kèm theo phiếu bảo hành quốc tế có đóng dấu của chúng tôi và hãng sản xuất.'
                }
            ]
        },
        account: {
            title: 'Tài khoản & Cài đặt',
            count: 6,
            questions: [
                {
                    q: 'Làm thế nào để tạo tài khoản?',
                    a: (
                        <div>
                            <p className="mb-3">Tạo tài khoản rất đơn giản:</p>
                            <ol className="list-decimal list-inside space-y-2 pl-2">
                                <li>Nhấp vào nút "Đăng ký" ở góc trên phải</li>
                                <li>Nhập email, số điện thoại và tạo mật khẩu</li>
                                <li>Xác nhận qua OTP được gửi đến điện thoại</li>
                                <li>Hoàn tất và bắt đầu mua sắm!</li>
                            </ol>
                            <p className="mt-3">Bạn cũng có thể đăng ký nhanh bằng tài khoản Facebook hoặc Google.</p>
                        </div>
                    )
                },
                {
                    q: 'Tôi quên mật khẩu, phải làm sao?',
                    a: 'Nhấp vào "Quên mật khẩu" ở trang đăng nhập, nhập email hoặc số điện thoại đã đăng ký. Chúng tôi sẽ gửi mã xác thực để bạn có thể đặt lại mật khẩu mới. Nếu không nhận được email, vui lòng kiểm tra hộp thư spam hoặc liên hệ hotline để được hỗ trợ.'
                },
                {
                    q: 'Làm thế nào để cập nhật thông tin cá nhân?',
                    a: 'Đăng nhập vào tài khoản, vào mục "Thông tin cá nhân" trong trang "Tài khoản của tôi". Tại đây bạn có thể cập nhật họ tên, số điện thoại, địa chỉ email, địa chỉ giao hàng mặc định và thông tin thanh toán. Nhớ nhấn "Lưu thay đổi" khi hoàn tất.'
                },
                {
                    q: 'Tôi có thể xóa tài khoản không?',
                    a: 'Có, bạn có quyền yêu cầu xóa tài khoản bất cứ lúc nào. Vào "Cài đặt tài khoản" > "Bảo mật & Quyền riêng tư" > "Xóa tài khoản". Lưu ý rằng sau khi xóa, tất cả dữ liệu, lịch sử đơn hàng và điểm thưởng sẽ bị xóa vĩnh viễn và không thể khôi phục.'
                },
                {
                    q: 'Làm thế nào để theo dõi lịch sử đơn hàng?',
                    a: 'Đăng nhập vào tài khoản và vào mục "Đơn hàng của tôi". Tại đây bạn có thể xem tất cả các đơn hàng đã đặt, trạng thái hiện tại, lịch sử giao hàng, và có thể tải xuống hóa đơn điện tử. Bạn cũng có thể lọc theo trạng thái (Chờ xác nhận, Đang giao, Đã giao, Đã hủy).'
                },
                {
                    q: 'Chương trình khách hàng thân thiết là gì?',
                    a: (
                        <div>
                            <p className="mb-3">Chúng tôi có chương trình tích điểm dành cho khách hàng thân thiết:</p>
                            <ul className="list-disc list-inside space-y-1 mb-3 pl-2 marker:text-[#00bcd4]">
                                <li><strong>Bạc (0-10 triệu):</strong> Tích 1% giá trị đơn hàng</li>
                                <li><strong>Vàng (10-50 triệu):</strong> Tích 1.5%, ưu tiên hỗ trợ</li>
                                <li><strong>Bạch Kim (50-100 triệu):</strong> Tích 2%, miễn phí bảo dưỡng</li>
                                <li><strong>Kim Cương (100+ triệu):</strong> Tích 3%, tư vấn riêng, quà tặng đặc biệt</li>
                            </ul>
                            <p className="text-sm">1000 điểm = 100.000đ, có thể dùng thanh toán cho đơn hàng tiếp theo.</p>
                        </div>
                    )
                }
            ]
        }
    };

    return (
        <>
            <main className="flex-grow flex flex-col font-sans">
                <section className="relative bg-slate-900 py-16 md:py-24 overflow-hidden">
                    <div className="absolute inset-0 z-0">
                        <div className="absolute inset-0 bg-gradient-to-r from-slate-900/95 to-cyan-900/40 z-10"></div>
                        <div className="w-full h-full bg-cover bg-center opacity-60" style={{ backgroundImage: `url('https://lh3.googleusercontent.com/aida-public/AB6AXuDDZyynWviqWOmDEvJ4MYSs8Tl1jFDsRrbSqCeJOqHkoh2limKRgekhp54rCN5zjy2cFBNTmtDJxOYr9MwI5GDve07L4o4bQA8DN-GzCd9e2N4LQ2b3Vjaj9W-uwcc5ILcGhx-ka8uUJqjZ6fMIcyYj6nszl6GNK1aKjzfYAh2epAqrQGUm3-C11v40PMIPIMQQqqAMf7BQ-oJl7VjYe3VYdhQxYXSsk4iYqyfu8sRi9CPmwXOLCvaIgoJG5KHDJaYoBHHF0UuSidM');` }}>
                        </div>
                    </div>
                    <div className="relative z-10 max-w-5xl mx-auto px-6 text-center">
                        <h1 className="text-3xl md:text-5xl font-black text-white mb-4 tracking-tight">Chúng tôi có thể giúp gì cho bạn?</h1>
                        <p className="text-gray-200 text-lg mb-8 max-w-xl mx-auto">Tìm câu trả lời về vận chuyển, đổi trả, bảo hành sản phẩm và theo dõi đơn hàng.</p>
                        <div className="relative max-w-xl mx-auto">
                            <div className="relative flex items-center w-full h-14 rounded-xl shadow-lg bg-white overflow-hidden ring-1 ring-white/10 focus-within:ring-2 focus-within:ring-[#00bcd4] transition-all">
                                <div className="grid place-items-center h-full w-12 text-gray-400">
                                    <Icon icon="mdi:magnify" className="text-xl" />
                                </div>
                                <input className="peer h-full w-full outline-none text-sm text-gray-700 pr-2 bg-transparent placeholder-gray-400 font-medium" id="search" placeholder="Tìm kiếm câu trả lời (ví dụ: 'bảo hành', 'thời gian giao hàng')..." type="text" />
                                <button className="absolute right-1 top-1 bottom-1 bg-[#00bcd4] hover:bg-[#00acc1] text-white font-bold px-6 rounded-lg transition-colors text-sm">
                                    Tìm kiếm
                                </button>
                            </div>
                        </div>
                    </div>
                </section>
                <div className="w-full max-w-7xl mx-auto px-6 md:px-10 lg:px-20 py-12 md:py-16">
                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
                        <aside className="lg:col-span-3 lg:sticky lg:top-24 h-fit">
                            <div className="flex flex-col gap-6">
                                <div>
                                    <h3 className="text-slate-900 text-lg font-bold mb-1">Danh mục</h3>
                                    <p className="text-gray-500 text-sm">Duyệt theo chủ đề</p>
                                </div>
                                <nav className="flex flex-col gap-2">
                                    <button
                                        onClick={() => setActiveCategory('orders')}
                                        className={`w-full text-left px-4 py-3 rounded-lg ${activeCategory === 'orders' ? 'bg-[#00bcd4] text-white shadow-md shadow-cyan-500/20' : 'hover:bg-gray-100 text-gray-600'} flex items-center justify-between group transition-all`}
                                    >
                                        <span className="font-semibold text-sm">Đơn hàng & Thanh toán</span>
                                        <Icon icon="mdi:chevron-right" className="text-lg opacity-80" />
                                    </button>
                                    <button
                                        onClick={() => setActiveCategory('shipping')}
                                        className={`w-full text-left px-4 py-3 rounded-lg ${activeCategory === 'shipping' ? 'bg-[#00bcd4] text-white shadow-md shadow-cyan-500/20' : 'hover:bg-gray-100 text-gray-600'} transition-colors flex items-center justify-between group`}
                                    >
                                        <span className="font-medium text-sm">Vận chuyển & Giao hàng</span>
                                        <Icon icon="mdi:chevron-right" className={`text-lg ${activeCategory === 'shipping' ? 'opacity-80' : 'opacity-0 group-hover:opacity-50'} transition-opacity`} />
                                    </button>
                                    <button
                                        onClick={() => setActiveCategory('returns')}
                                        className={`w-full text-left px-4 py-3 rounded-lg ${activeCategory === 'returns' ? 'bg-[#00bcd4] text-white shadow-md shadow-cyan-500/20' : 'hover:bg-gray-100 text-gray-600'} transition-colors flex items-center justify-between group`}
                                    >
                                        <span className="font-medium text-sm">Đổi trả & Hoàn tiền</span>
                                        <Icon icon="mdi:chevron-right" className={`text-lg ${activeCategory === 'returns' ? 'opacity-80' : 'opacity-0 group-hover:opacity-50'} transition-opacity`} />
                                    </button>
                                    <button
                                        onClick={() => setActiveCategory('warranty')}
                                        className={`w-full text-left px-4 py-3 rounded-lg ${activeCategory === 'warranty' ? 'bg-[#00bcd4] text-white shadow-md shadow-cyan-500/20' : 'hover:bg-gray-100 text-gray-600'} transition-colors flex items-center justify-between group`}
                                    >
                                        <span className="font-medium text-sm">Sản phẩm & Bảo hành</span>
                                        <Icon icon="mdi:chevron-right" className={`text-lg ${activeCategory === 'warranty' ? 'opacity-80' : 'opacity-0 group-hover:opacity-50'} transition-opacity`} />
                                    </button>
                                    <button
                                        onClick={() => setActiveCategory('account')}
                                        className={`w-full text-left px-4 py-3 rounded-lg ${activeCategory === 'account' ? 'bg-[#00bcd4] text-white shadow-md shadow-cyan-500/20' : 'hover:bg-gray-100 text-gray-600'} transition-colors flex items-center justify-between group`}
                                    >
                                        <span className="font-medium text-sm">Tài khoản & Cài đặt</span>
                                        <Icon icon="mdi:chevron-right" className={`text-lg ${activeCategory === 'account' ? 'opacity-80' : 'opacity-0 group-hover:opacity-50'} transition-opacity`} />
                                    </button>
                                </nav>
                            </div>
                        </aside>
                        <div className="lg:col-span-9 flex flex-col gap-8">
                            <div className="flex items-end justify-between border-b border-gray-200 pb-4">
                                <h2 className="text-2xl font-bold text-slate-900">{categories[activeCategory].title}</h2>
                                <span className="text-sm text-gray-500">{categories[activeCategory].count} bài viết</span>
                            </div>
                            <div className="flex flex-col gap-4">
                                {categories[activeCategory].questions.map((item, index) => (
                                    <details key={index} className="group bg-white rounded-xl border border-gray-200 overflow-hidden transition-all duration-300 hover:border-[#00bcd4]/30 open:ring-1 open:ring-[#00bcd4]/50 shadow-sm">
                                        <summary className="flex cursor-pointer items-center justify-between gap-6 px-6 py-5 select-none bg-transparent">
                                            <span className="text-slate-900 font-semibold text-base group-hover:text-[#00bcd4] transition-colors">{item.q}</span>
                                            <Icon icon="mdi:chevron-down" className="text-gray-400 group-open:rotate-180 group-open:text-[#00bcd4] transition-transform duration-300 text-2xl flex-shrink-0" />
                                        </summary>
                                        <div className="px-6 pb-6 pt-0 text-gray-600 text-sm leading-relaxed border-t border-transparent group-open:border-gray-100">
                                            <div className="mt-4">
                                                {typeof item.a === 'string' ? <p>{item.a}</p> : item.a}
                                            </div>
                                        </div>
                                    </details>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
                <section className="border-t border-gray-200 bg-white py-16">
                    <div className="max-w-4xl mx-auto px-6 text-center">
                        <div className="inline-flex items-center justify-center p-3 rounded-full bg-[#00bcd4]/10 text-[#00bcd4] mb-6">
                            <Icon icon="mdi:headset" className="text-3xl" />
                        </div>
                        <h2 className="text-2xl md:text-3xl font-bold text-slate-900 mb-4">Vẫn cần hỗ trợ?</h2>
                        <p className="text-gray-500 text-base mb-8 max-w-lg mx-auto">Đội ngũ hỗ trợ của chúng tôi sẵn sàng từ thứ 2 đến chủ nhật, 8h30 - 21h30. Chúng tôi thường phản hồi trong vòng 1 giờ.</p>
                        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                            <button className="w-full sm:w-auto px-8 py-3 bg-[#00bcd4] hover:bg-[#00acc1] text-white font-bold rounded-lg transition-colors flex items-center justify-center gap-2 shadow-lg shadow-cyan-500/20">
                                <Icon icon="mdi:chat" className="text-lg" />
                                Chat trực tuyến
                            </button>
                            <button className="w-full sm:w-auto px-8 py-3 bg-gray-100 hover:bg-gray-200 text-slate-900 font-bold rounded-lg transition-colors flex items-center justify-center gap-2">
                                <Icon icon="mdi:email" className="text-lg" />
                                Gửi Email
                            </button>
                        </div>
                    </div>
                </section>
            </main>
        </>
    )
}