import { motion } from "framer-motion";
import { FaPlus, FaClipboardList, FaUsers } from "react-icons/fa";
import Footer from "../components/comman/footer";
import Navbar from "../components/comman/Navbar";
import { useNavigate } from "react-router-dom";

const employerData = {
  name: "John Doe",
  company: "Sphinxhire.AI Private Limited",
  totalJobs: 12,
  totalApplications: 98,
  activeListings: 5,
  totalHires: 24,
  recentJobs: [
    { id: 1, title: "Frontend Developer", location: "Pune", applications: 35, status: "Open" },
    { id: 2, title: "Backend Developer", location: "Bangalore", applications: 22, status: "Closed" },
    { id: 3, title: "UI/UX Designer", location: "Remote", applications: 41, status: "Open" }
  ]
};

const EmployerHome = () => {
  const navigate = useNavigate();

  const quickActions = [
    { label: "Post a Job", icon: <FaPlus />, color: "bg-green-600", path: "/employer/post-job" },
    { label: "Manage Jobs", icon: <FaClipboardList />, color: "bg-blue-600", path: "/employer/manage-jobs" },
    { label: "View Applications", icon: <FaUsers />, color: "bg-purple-600", path: "/employer/applications" }
  ];

  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-gray-50 py-10 px-6">
        <motion.div
          className="max-w-6xl mx-auto bg-white rounded-xl shadow-lg p-10 border border-gray-200"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          {/* Header */}
          <div className="bg-gradient-to-r from-indigo-50 to-white rounded-xl p-6 md:flex md:items-center md:justify-between mb-10">
            <div className="flex items-center gap-4">
              <img
                src="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wCEAAkGBxITEhUSExMWFhUWFRgXGBgYFxgWFhYXFRgYGhgWFxYYHSggGB0lHhUVITEhJSkrLi4uFx8zODMsNygtLisBCgoKDg0OGxAQGy0lHyUtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLf/AABEIAN0A5AMBIgACEQEDEQH/xAAbAAACAwEBAQAAAAAAAAAAAAAFBgIDBAcBAP/EADsQAAIBAwMCBAUBBgUEAwEAAAECEQADIQQSMQVBEyJRYQYycYGRoSNCUrHB8BRictHhB6Ky8RUzgmT/xAAaAQADAQEBAQAAAAAAAAAAAAACAwQBBQAG/8QAKBEAAgICAgEEAgIDAQAAAAAAAQIAEQMhEjEEEyJBUTJhFHEFI5FC/9oADAMBAAIRAxEAPwDl3S7M3KcLVsBeBxS1oxtM1vbqXaqBgIEsxOqjcF9djdWOzbrVqVLGamlg+hpL4zA7a5lu28VPpVnc1W6iy0fKfxXvSXCtSwKm17o2dO6epIq/rlvZbgVLoupDGvPiG5IArm+WScqiWiuOotWNPurP1LQwJFFLBAFR1FneNxDeGpAYrBb6KP69pqzYiuNiCdB0UlitwvZcEbWdP2WcgMx4mMHimG7qtNbG9oF9Li7mVdu9QRJAU7VaCT3BAEepXeo6ssxW0WS3MKHYkJBPlBbMjMx71jOkUT4rwfC8RfQgjyKIkyeIgRyYFeKF+zFDIuPSiOGt+NrbPdIki8mxwu5Vja6sds+ad4btx7mtWn+MNOz3N14rEm05tFT5rodlMAx8isO0kiMA0i2dXZz+xVYTyzNwtcCgSxYwFJ3GAMYHaavfX2Xfb4FtLRK+bbF1RgM0oQG7mIzXvQSqg/yWuN7fHWlRlZUvP5NjAwudsG4pZjJJ3NmD+0IJq/R/FNu4rhdptkqxRpO05G4ysAyExxSe1jRXAP2hsNlfkZ7bbcB45TdjuYM4Api+GS+lBtlQ2eVAcYLGLgOUKmJEdxExS8mNFWwNx2DI5fcN9P61avXVs70tsNzxcIWSMggk5LBp2444pi6f1D2EXUDkYYOigkjf2UysE4jdk4rmPxhqbDFi6sLjceUCSJAJP3BgTwfWgum63qrUKt66uwQFLEhRIbaEaQBIBiKWMHqLy+YWfNxcq251H4h6da26rUhVu6q9cVbVsndsW5EMomICBiD2gUh9X6JesuLd5YcgNAYMYPEgfL9609D+Or9plF0K1vcpJVVFxQsA7TwZVQII4GIp90FnS6xDcsjx715yWchgUM5wfl5GJgD7U1C+MgN19xYKP1OW6jRFVr3pHziaN/F1rwmNvG4GDBDAfcEip/CvwXrNSnjW0hOxJjdHp61WzKsEgBtRr6TcXaOOKp6r1VEHNK2svX9O7W3UqymCD2oL1PWvc5mnDMOOoxnqM4+JEJrcnVLZE1zq2SKvF9qz1TFDMY4L8QhH8rsv+liv8qYND8XXgBt1Nz7uW/Rprld22TmvUNweteV/sT3qfYnXH/6gaxcC+D9USf8Axr6uSf41vU15XuQ+oPNPqdPu/CKATxQ678NWgZ5o313rgU7RSvq+sseK53lf5DK7Vj6nSxeKlW8J2em2R+6K0f4O0OwpWGrfma9u6545qBmzN20fxxjoRwFm0RGKyL0uyWwAKU01rjuaut69wZk0HDKP/U8PTPxHOz0+0nAFRu6G2/IpTudWut3ip6bqN0Z3GBEnGJ+v9/ig9PKTd7niuOGup9NsIAcA8gHg7RJ3f5QAZpP+IOr2zuVW3MANjBAoBkE4x5YBAEYkYEV71rXhke4Tc3OdqgYtADgl5ksBuIHGftS5/h3PnbAMncxifXnJNdjCjcRzM5fkZgCVSR1Wpa425jmI4j1yfUkkkk5zVapWxrFu24Fxi4G0sEhZByQGYcx3jmvk1gDMVQKCrBYJJBPB3NJMfafaqLkVfc8OhuAbisA/xY/AOfvFW6OzZ2lrjkkAygwSZUKASPNySeMCqdOtxiSu4nuQc5xz7zH3o7o/h1VCXL7wh+YJDOp7iB6SpPGDQMwXuMx42boTDptUqKDbtKXK5Z13m2QzDyTgyu0zGOB3lt+EOq+Vw/zMCWGZgQN0RBEDI9J4rOnTLVtCvgtm7tW85KAYBhkPtJjBMiugdE6RZKm6oRGC8rK7gYIjgwffOa5/lZ147EvwIyHuJfVuoWATLeQbgVgsrAyNpUEcgxM4OfehGnsWdWC4tlyb3nY//eisvMo37TzDBYZyIJzRr4j+H0diAWWJIgblAJiSJzJGYzj7Upq+q0Dx8u5p4DJc2bhE9xlsc5BpviupSlMHywxayNSrR6OxfUKjG1cVGL7wSjbSTv3AkrAKg+UDyk1t6R1LWdNLsgm3dXazKd1tgZgo4wrcwecGpa/TDUL49si3dulhsnF1TB2kjC3DB8pgNtnEiR3T+stZXwwpBi6GnhmuBQpe24IIQrwRmTVdXItCPXxP0C3fTxNFa3WbY8+oF9WVjG6BbkzEjuDzIrsvwtZRNHp1T5RZtxH+kT+s1wL4ONm8j2XueGSbj+CCCpuAqVe0jEQNhKkSSdojg069E+L9TpLfhbBdRflBJBX2B9Pak+ouNqMd6bZUsdzb/wBT+lK2pR8S9vP1Ux/Ij8Upr0JIzVXX/ibUam94lxQIEKo4Aqy3rSUqrBlxmPRaWjFXrehVGO2hG+mHqdosTWTSdJDHNESCdRDoS2pgsXJreb4iCKKp062ooP1VVBMVgI+5442QWYKurmvq+319WXFajh1i4TcM+tY4ov1bTzcP1rGdLGa4xOyJ2VfW5ntW6hfcCrL9/bgVgY7jWqDMZ9Se8VNnrxLfrV+ltBmitNCKDtJWFUgZM/QEfzmsHXnJUKplVLDEgNwd/v6R7Uc6paS1bERL+WO+0iD9JJ/Q0l3NSTyY5x2A+nvn807x15e6L8jIVHGfPqyvlPnhGCgsYRnGCsYBBgkdyM1l3OwgkkLxJMKDzE8TUmsQN3qRBPGRPP5/FQ3zAUE4iP8AMZGAOe1Xicw/ue6i6SxLks3lknGAAAAPSAKu0ek3GXJVSCVxO6Ow/wB6loNKdw8u95BCQW3exA/lR7RBLO13i6GS4hWSDaadrbfQgEwRImfegZvqMx477mroGiYNZZ18FSd26Ad7bQbakEyFIKtMH5iaN9L0EJthVYEjcCXJxEgMNoBBOCG4HFDOnLc2hdrttJjdhvOZMbiJzkketMOnS4ASbbQBJIhhGe6kz8rfg1M5J6E6eJABuT1fSAVLyYJBfgEgQJmIBAHpVWg6mUtIQCLYCIsSWLySw7DGR6YgUf09pzFs238wn5ZEe8ccxmKr1fRRtOxikDgAEGJaIPvmeQTikPiLjYjLVTAwL3LkPABbYYAIAMsxz65kyfm4OKj1DSm61u1eR23h5krskxFxSBKwQBECAy/SmIaFdxBYQx+XIM44zn1+w9BRRuk2jbRCgIRYWRMeXbPvitxYmg5MgnFNR04WLqJdYnT3grhh6ESm4diCRMZiYOahdK6hnS7CXEO1b8llafkS83MQDD8wMzFPOu6E960dMVHiBtoZjIDIWKkGPKCrIv3FIGs09y7pzcjOnZbLx3QAhCRPKGVJ9HX1M2YXJFHuc/OgU2OpkRX095d+5HRgSVgsB/EmYJjIMxxXSrOpV8nJ75Bz3IYM24HmZ70hdH1du4i6W+CVLRbuSS1lm2hYXukgyB2b/KKZOoaW/Z09h25UG2+DKspO2STlCAYPE7oiYpXl4+a/uM8Ngrb6hTUW7Yqu1bB4pQ1XU7hxNaen9bZOc1B/HcCwZecmM6qMl/RGJoTfYr2rbY+IkYZrUrWrnoaBXyJ+U9wU7Bivf12YNQ2K/NM2q6HaYdqF3OgEfITT08ha7qLzqx/Yg8dMQ17U3015TBBr6meo33JqH1D3UbnmJ96FXeoSYovqk3NFXaP4bJaSKPw15sSY7Ia6gI6MkTFXaLpLNwKerPRABEUT0fTFQYAqw+JbQfWWpy7qehZOaxdKD+IABJJgCm743dVpP6fqgoe4cY2KfRn7/ZQx/FT5vHKahBlLAyHXOoFmB5X5VBHzBf3vWCZ/SgN+/Lknv3pm6fo0u7mcELIEEwMA5J9M4yO9DOtaJFJZf4gP8sEEyPTiIo8bKDwk2ZGYcviYdYjQg4UgN6RMxP27+/1qOkBRgbZO8EbTwZ9jx/7rV1CCLc8BQDn2QYEn0PpQ+7fJwIAJmI/qc00bk7aMI6eICoJM7iYhgSANoYcgZI9+wrZ/iGQwks/dyZ+wmqtGpAnJJyT3/WvLt3bmKC5QgoXNyPrTlTPeAxHH3rcnxHr7eHtk5mSoaMEYaCRgkYNCtP1y4o3BPKOT/wA0c0HVTeHkJFyN21hAYDGD3zisJYfEoXg2g0Y/hz4yl4u28sQRAACtunfAgkznM073roNskHG0grtGWJWG3mSIG7HvXMdD1xZAYCeMjINdG6e37Ld2NCuVrIM9kxigRAup+L7VhvDdH3LEHlYE5C4gkMZI9BRvp3V9NfAa3dEzkbvN8sQynIzB4oN1S4hBL21YDuVBj70I0HSdFqGgMyN6KR/JhiiXJ8Ga2HXKHfiPp6h/GgQyhC67d0kqBIJ4iYM9hzXOOvm3ptf4rJNi/bJe2kooFxdl1eDJkb4HJIyIroadPv2R4Pim7ZuQFY4e1ckG20zkbgvfFJPxrbNzRoS2LTrtAfdO9YdjJJB/+sRJ4PHAHS5P7isqkp/UTtZpX019rcw1tjDe3Zx9QQR9a6J0+4LnTBZuMxJBgsrbzdAe4MtnbCBeDM44oV0zT29Ts1VxBuW04VVyo8BiLYdI83lHHECTinbRIrOm5nUeACAdhW4AU8xg4YuVhvm3EgxityNeovCoU2Zx+6sGpLami3xNaAvvEbSxZYEDY/mSPaGFUaSO9IL0JWUruYnskCvLN914JorcQGqDbWhD33A4WdGeWuq3JyaYOmdcX96li7bHaspBFC2FHE0OyGP7a222ZFfUhLfcetfUr+IPuH66/Uc7Txc+9P8A0raVFJGl0/mk0QfrHhQJrqf41RwJi8yco36q+iCZoPqviC2oiaAvr2vd8UufEXTbq+cTVfqnlQER6YUXC/WXW+Y9aXddYtpFowNm9ifm3MdsSuOIVfse1Q6P1BlaWEhfMwyPKOZPb0+9ZLmmYm45kksYUQBkyd09gOw7xSc78od2LAmezbdrgKPBgbiCQCJMTHaIx7UN1WocsQ5JgkQe0H0pu6dpwqmTuY8kyTjtj04ilPqqRcY+p/sVNjfkxEXmxlVBlnUFOxPp79gB/Q1j06eYVrvmban0/wCf96psDIpwOpMwthGPQ6VmBKqSq8kDA+pqy904sMVo0vUZsJZAgAySD8xzM+syPxRvp0EZqZ249Tp48YYVF/SdFcqUMbW5nnnkHsa1a3SeFZARjuXZDPLMotydtvgKss5j/MaZnAAkUB6u081i5mMY2FVGu4B0ilrgY92n8mu1aRf2Cj2rkfT7e5xHrXYemrNpQfStu2iapJzX4ga7du3VDgC2GISc4Hp3YwKCdI1V/aLoCuBuJCt+1thNssV5A8wj1rqPU/hu3cbdEN61Rb+EQF2eI6rztBxyTkd8mc0Y+iIbOCQQamnoGtN60rEzEZ7GODS11DSC5a1Cgbf2l+1ugAEzK57DcbfbtE+jxptIlpNiKAPbv71z7TXw2q1dloIN25s4BUuQN27bMSpxPBc4xIuDWoPIE/qE/gfQJp9rg7Sx3eaAfk8MTtmJBcxJ+bmivWuiybO0kpu8UbT5d6yXEAeUHcWmeeM0ldP649zUtasW9ybmEmZAt+UMGBAVdqg5jJyTM0y63U3nubFwEP7Qekgw/l9YQGJGR64n/wBgem+Z4KhopqKXxlofCuWxuLeTaxIjzKZIHsA6r9qyaLS7hR34vsXG02me6v7QMyOSfPlF2+IP4iLck+0UvWNX4ZFey/qOFFfdLNTpytCtSG7U1Wr6OMxXp0Sc1Oubj2IY8f6MTre/0NGuk2A2CM0Y0unQ9qJWNJbXOK1/KH1F+gV3cA3umCeK+opf11sEiRXlD6rfU9xEuu3gomgtxHuXB6VVr9cQYon0e4Imul41pjAk2RreoT6bptpFMmr0SukEdqXtFfm4KbrVssIUTV2AjuDkNVOU/EejFndsI3tJiBgL9eZzj2oCoblpJJJQboZ/UnvBg5ot8R9Qm/cfJyVQdgAI3Y+5j/N7UF12qZgjHiAB64Ek+wkkj2qZzya5jmpSvWLq8MczPvu55rLrtWbmW57moahpNRs2izKo7kCtCgbk5Zm1cnpnJ8vr2q2ysGs1oHdAMQTmrUvZAPrWt+oC67hzQtFMvTrtLOlo5065mpMm51MBjPYtbqWevWSLgTij2n1sVj6pbFznntSkNGUZBYgnoqzc8gJCsoYwdoLTAn32n8V13S6m2AiEqHYGFJAJiJgcmJH5pU+Cemod1tyNrwx/iBtzDL6/MfzThd0VpTbXaWKksrkSdxwx3dicY9qYjWdSRzQ4maHSajsNWoKjcMVTEyL3VW3c3EABd3H8Oeft+tck+Ibg0+nbULPi322A/wAO7czMO8xIB9/Y0+/EF6UNufnnuB5Vy2Txj+dcz+NtWtx7dpR5UGDkEEz5CD7QZj96kNktwPgR4xkISOzLP+mfUbdhz4iAqVYkkTtCtbjcOSs+nBg099V6yo1C+Eu4XE4YEDjdMfNIlBBHdvSQD+AvhcFCXXcXRhESFBBzRS7aRTf8Ulm8QjcYncAN2yDIB35HBG0fVPrI2TUxU49zP8TN4ujd1ClSEuqxG12IYFvKBBADMNwjkczXOdXLcV11bCahbiXGJO5h4e0IyyWwpBKqGULjvIOK5uOnmtyMFIMbjXkpWBLbuvrRbTa1og15f0u2qbQk0tiGFx2NGX5jLoNu3Job1XqDAEKartBgIr59ISKnVQGszMgYiLZutn619RsdOFfVX6y/Uj/jt9zVr7Kl6NdO0wCVX1boNzkVHQm4FhhXWx4+GHYhmibmi0IaRTv1HrFuz0jeHCve/ZAyAd7ttOfZZPtE0lo4FBet3lZ1TdhNzDBYKxAMkcAwuKlGYfiIOXGGAgW8yGPEIAZ5IknYDA3NAx3x7VgvuuSRgtMZ4ExB7CCB+K1nQB9zbh5U8RpnKggbgY9xih2tjHmUmBle45zPcTH2ryiIyGD3Oa39ESbymJiTH2NYQJol0ptviXB+4h/JwKJzqZ46+8EwYWIc4/eOPvxUbx8x9jW/R6B3khSST7d/rWbW6Vk5UiPURRBhdSd0bZhjR3ZUGiWlu5pc6bfgQeKK27manyLuW4clgRq0eSJ4oV1DqLeIywYHHv71o6fqJonZ6SLtJBCnctBsTL0XX3bbB8iJIPPYj+tNug+K1J2ajCGPNkbT2kj+dY9F8OlSO4HamnR9KtgSVB+o/pTUUHYjc2TAEqrM2JqIEsRGYbtt7bieDX2ouV5eYAR29O1BOtdQFlC4PsqngsZP1HMn2FG7VIMaFzQgvr3UVXxrk4tLtBETv7qJ9ZUYI+U1z/oVxb18tePLb8RAJbPzcAAmB7Ua6zqWvQhMW9qvsQQskls92aTyfWaXOkjzvHYfyNSgji0uGE8l/c6doOuJZUKGIJClgQsruMEEoT5jAIHpHrVfVLQvst1SoJt7Csggy6ZY94MY7jFc3s+W+WAytxW9RlgZIHIwQRj5qZWdpPhYthoUkEKLs434JAICc8At7UK+MFPIRN7N9x0udPv3Le1GYG0dgZyP2p8M7XeBhgIJ/wBfrwr61QLjjHzH8EyP0NGLOpe1K6eBaVRwwZgVX9mgj5xAciB5oOQaBfE17w9R3G+2rkHsTIie8bRPvNb5C8hqb45PI3BnU+KxdOEmp9Q1IIqHTHApIBCSwflC4Sp7ap/xIq/xZE0g3POJ94Qr6sF7WGa+reDQOInRf8dbYRigvVSnahRBnmrdQcV2B5vqDiBOf6YWY7twcmYGSR2A5NBbemcG5d2kl2aJZVUCRM7j5iNwAHGDV/WtQRbIU5YqMCTtkSY+u2gd65KQ5Una5UHeCvmmMYLGcAyI5ik4k7MzIwEq1GnKebcpye+SZ5gjPb9KG6o5n195z3zUncnn7fWvNPa3Oq+rAfaqRobkZ95oSDoRH0rZ0vWqhKuPK22T3G0k/wBf0qfU7e68UUScAR9BVFjT7XhwR9qGwV3GENif2xjc2FU/tpOYC7TOJwdsdz9JHNVXrdi4hAuJj1MEY75xkVlTQLcAhSomdxk3LhYEBVUYgMM8c0va22BcdRwGYDjsfahXHZ7h5M5UdCpotW4xgwSJGQc8g+lbbbEYrN09Zit5SiY7icY1YmzQajMU+9AuggUh9P0e8039F6ddWNrD6EYqTIdzoYQeO50DQRW28wApf0S3hzt+xP8AtWxkd/mOPQU9XPHqJZBfcG9W6zbTLN9ByT9BSkbt3W3gYKqvA9OCM+sxJrz4ptgak+ygfz/4qfT9aqAwMbRxPzD6n3P4qHM7bnVx+PSAqIY6z0EpZUsvyjeCAvfB3EfUn60g6JCL9wd4JP3IP9aeH6ujQjEgRBkggYII9+1J14RqruwgpJWRwVOR/IUGEtRuagYFeXdzBbukXHEmCcgTJAZfKB3mTimrRaplu+EWLAuA5IDDaxubdoAyRkmOZgcgUrFovMu0EuQBJgAkj+/vR7Q6gGQqsrhg6ww3BgLgnc2BPlgZHlPrV/wJA35t/cZNH1IaVPCdA7oDtYDGxIQHyZb5e+B6iQKDf9Qbag2HUCGFzIJO5ZUox3ZAMuRPYzRjprW7i+CSxDXYAMbpuEKyk/vIYEq0AsDHaMHxzp1Ont3A+4rcCQFI2AqSFPpEfbArxgrQcRJd6u0wNZWOaJaZcUh9CW4/c0+DGaLaYeWhyJmi6LC1NkMYwmJ7Imvqov3DNe0wdQeJjr1b4X1GmAe5tZSY3IZAPoZAig+ozj1xTn8f/G+j/wAMbVu6tx3K4XIUAgkk9jjj3rmmq6p+x8QDLkqkeqjzP9Fx9/pVYxBD7OpyMWUsPd3AvW+okXGC9vKG7QnMfU5mhGq1BYlj37entX17UZM/y9fSspfNUolCT5chYyTvP1oh0GzuuFv4Vn84FDCaY/hUKUvKeX2iZiAoYz92KD81mXSmM8SjlBMGJqCt7xAJM9+KM/4yw0biwlgJKwI+UsfNkEE85oh0L4XDfPJYAEgggEk+nMfjimD4p+DVtWE2qu4jdKzuaeV2+gEVI3kY74xvDICSfmJmp66lpNtom5cYAs7fKsALtAIliAsA+kekUB6fYR70MIWSSBwB6Se1T1+lKOUIIIOQRBH2rYNO1kFHUq9wARjCmDB9zFV6C6+YheTNbdCVaaNxjiTH07VtupFS6WinbKwEyxgdu39alqboYk/xEn8mf60sndRwHtuG/hqxOaedDagilH4WXinLRsN1Sn8pYNJqHLSVNxFU6e5UtRcxVl6kRBuc0+Ibk6m59R+ABWO3xRHrVol9wBM7mJjsCFnjj889qx6VN3kkAk4J4kA4n7/yrmPsz6jxnAxg/UzXeR7H+lDtLcPjXB7j9KJ3xH2P8jQ7RmL7/SiT8TM8j81r7lGttA3c/wAIIABJYyMR/fFbdK24+KbisQ6EgyN4G9oxzyR/+hWTqbMLqMhg4M8xnmOD9O9W6ZyLiuohQ2ZEQIaSR7ieOCsdqrx7UTi+QKysKjbp9L403QT4rXStwBgIUPdZWQj9+GYZmIB9KI/E2nuXNJcOxkUKrFCQY2MGL9oMYM+giaWdIj+Xw0lGdVCEgSwLblJ4AK54MAe2WfXmbL2VI8Ft9rxJBKtvChYPCqCpAHO4+9eIi7oic0e3miVhIFDbLSQaL23EVPkJnRwgWTLdNak0TuYWsmgbNEXthsVI5tqm5TuLeouDdX1NB6GhzivKvGFqkpyi+5znqCkt3q4Xz4QtgEx6kwJJLQOBkL+KYOn6HTrcLaneWVFdbSxO5o2eKxwmSDs5Pf0OPqF83rhuFUX0CjGMDLTP1qldKLnL4nkYvPYxJ5/kBwKhb0bHNbL2nCmZJmRzEH39fpU9PxR8tQPTFzE2kIrT0C4BfVW3EEMoCkDzMpAndiM1LU3IFU9H6ebrzJChlyPmJJ4X3iTP+9b2Dcz8WHGdA6R1Dw2OwCNxXmOCTiBwFAmf96PX9ddv3FLAtt4E+VSIBkmGGfbviue9d0ur097aly4wltqkZA2gbtkRBQr5o9qB/wDyd4uLhu3C2IYuxODIEzxMGOKhPhBzyBlR8ridiEte6vqrhYL854LQdpgtOTBiZ9609P0wcNdxDJeBHiebcVJWEwQolREmfyBivJcRAnhEyy3JOf3SIKgwI2t2kTk1b0LqfhbjABZvTBBVlKn1XzDBxg1WdLqJXZozadIbdsGN5JJ/yj3PqcCsNy7vGWtgz/CV/wC6KMawW3AtbmICkbh8jHaSGJzMxhRz95ofpOiAheROSD2G7aIgZPJj2PpSgdb7lLITpeox/DzhBkjjsQR+RRyxrAWwaV9DpEIKqxmDycSIkYA/iXv+K06SwZI2kNAwSw5YYBJOdrA/WKmbuVIDUebWqCiSQABkniqOo6+VOCF4JPlmYwJIjk57QaXtFqCChI/jBDHdInsTwMepwe9CPivrrtc8BcCdoI4Iby7BjgGSx+g7ZJWZ/bFuq4/cYY6b4xttq7bIEkoysVBZGEGJmZYYAgkR3msBtgnzSD6j+uDVXStMiILNwzvYN5SBJAMQSJkFfoJNEdVpioJP7vOOP75pWV1sASnByWzAmsQgGR2x7x70D0WpHjk/xY/v8UzXboGCAfaJBn271gs9Cs3L2bg0wIJmN6qew27pH5o8QFEfcbmzsSGHxA/XWIdT6CfwanptQy3QhmCRIVpyZAgqcxu7eprb8Q6G2HVbV8XmEg7bZUR6yWM8HFD7On5gEwYJgiDGcDvmqU9q0ZBmJyZSy/MZ+g9Tdbgtlp8/mYrvYsQdjgKJKglcAZE+lMy9R2uyOtssWG4qO3iMisTEfuuZOeB2AKHYvOFXaPMCSpEbsyCMZiR9KOaPraMq274DAt5oJ3AzKqysBvSdpjcTzWWJrYyNxc1Gjdbz2z8yMVMcSuMfittvRPR/VdNYaq4xQ7WKuGCttO9QTB/1FqKpYUYx+h/lUWbIQaAlmIgKDAPT9CRkitTWyeKJ3iAKwW74BNTAlmmZGlDlhiTX1V6m9LTFfV1gKHciLfqJVnVkvtMmLhnMk/u7mPLECc+9btC4FsA4xn7TNC9Lb53NEyzEc7R6fU/0rSzDEqBvbyg5YDuzds4/sU4i5EDUrYzuYTBbG0AtHqAazWbkHv8AfBqZbcJOCpgn8xEd6z3mzMnHr/OigE/MnYKvfRWjbPeSD3ggEHPHPemfQWRaMP5UIA/hPkyNpMT83MnMZNLuj0d7cjopB3SrZUAqRmfam+5vFtP8QFto2wSSS21dqs7EjClip7NkQYBpWUg0tx/jaskS/qWptXXtNbQAW233HktuPCjc8z8oxBjbzSn1rpYt6kIjKVusNnbbvYDawmBBPrxREfEVq0QFQ3NrswY+VSTILRH347CccBbtw3nvXislnnbkhVJhV3ciMKJ5gVuNCu/iZldWHEdxsuWrt9ixARrd0KceDAEBGgCQs24CyTOe+VLqWjFi61rxBcKnLrO0mMgBhMjIM96dNJ0y89orcZVItC5CEWwu2Rlycu5WGOIkmeBWDV9PRiEVBJ4C53CSIVI3H1nGBHM0tcoF/Ua2HkB9zB0/U7NqfMpKjGCGuDIjE8nv3NELe8KQizPiJnhQJBwCSCSrczOI7GrU6GnuCPQ8Qf8Aevm0fhKdsEmcsAcHsAcDM/k0JyKTHrjdRubLJCBlG/aASfKeSJ355jav12/j25bQDeZUbxyTEINxAiDI9BmVpe0y3hB3QBgQADA7THFaun6wbm3GRABDcYYNI9+ax1Hc1Mh6m7X9TFvyxLTj+GBkF2JxBngc9qyazrNzXC2r2ot2JAKqRJbsIOMDiaj1O74tzglrhBbGYPEYGTgyOZon0rRLbUstwtbPlFzbC7mjhScjAnHpQBgifuays776mnSOpU+G2WcLaBYFBgBix5Xkn18pmq+sXmUlTdLBmENx+6TM8lYAj2cYOK0poEKqshtk7wphQ4iG2jgnuCO1BeoXFRQqxtmAZmYA9ST/AC57cUlOLNHEkC55rNUDn2+/uTQa5qHZtif+/wC5qvW6qcCqdJe2FjEkowX2YjDfbMe9WLjAkb5Sxl/V7Jst4e4M8Zj90nsfeqlUNChvKBn6nk+5J/pQ1h+KMroLo2+QhSgcwVJ2tO0xOJI4OYzRsKEHGbbcneuq5UqmwjDxlSRwyd1MDjNXqoa5Kg5yd53Htye/1qi1ZkhRMTzHuAzRiQOOaLW7e1Adu1nHqTj19vSlO1CV4cZyPXxCWvvXNlsPclWQhV3kgKsDdtwPTmhek6q1pgbbzb3AOpbEE4PtHrTB034fuXkDiRP7x/hkk7VHPY9pmln4j6J4J8SGAJe1ckeTcVJRlI7MADBzQJj5dx+bMiLxWoynWC4oKmVIwfvB/UGrdPaG2lz4RuzY2k5Qn6w0H+c0w7/LUyYwubjEs9rcw3jk19Ukg19VJYX1FAaiLp7h2tEAlgonPP8A6r29cAExMH5vWPpV+kZQhJJ3FiQfTEf0Y/ihgYxt9J/WranNJ1NF1skY/vn71p6Natvd2urHapI28BgDG4DPMZoabwA/vk15oNabdwOBJH+1eKkg1AVwGFzrvw7pPE8hbymBAgBdpExA4wPvVvxfowzf4cvuXaQSAo4AKhSATiJpZ0fxHYBQ79oIDMApO08BTIzAaYBjynvz71D4ps+HKw91lYADdtTywCwYZme09xPArkjDlD3Og2RD2dRS6z0s2bvhg7gwDLEFoPAIHB/mIPtWzoGmZAxdW+ZW2RtbySZBbuJmOcdqHaq81xzeO3cSCQvlOAMgD6TI7yaMXOpC4p8UOSok7t8ocLuYyCSCV9a6jE0BJMQXkW/5Ct/U3GvKzHcqrlSIBcrvM+kCDnv2FW6fqCAm0jQx3+YZe2EksbkCADOYP7vuKTtF1AoGQY3GN0xHInj3P601dB8K0xKKClxCokjAXjcYAIaPr6+yHxhRdStMnPqTuX7lu2N4l9isO0yAT+NwB+labik2ldgQXUsqwT5R347wx+kUN1+lvlvEy4BGA6GUGNonzSPp68Ue1uoZiLQt7QAYZ5CBWAIICCExFTN8VKFJvcBaq2wtl+0AxgNkxgTJgx/Yq3SdCt3bTtB32yNzbgE2sB2PMMf0rfovPYeYTYHbfJ3FmVgi+oiSMT80xVXR+plXZXUXHtsFLMRnPJWTugyZPpR8jWoJXc0HTb058g2Opk7nLXFDpM+UiGwIIqSao2W23La/MVtw0hWjyOQcZk85wMVns6t/EvMV8z3rjAebhSqgQeJYkSY471n+JepNbVmWVdyAuPLCyCdpwPKAPXJ+w8WL8T1CJATkZR1vqfhXC5ViLlxjxClQCsf6s5H0mgdzWm8x2r5ZJA7yx4j8D7VmuNcvvLsYJkwPKg7kKOAPQYrci27QJ3SwGBt9RiSarCKv9yQO+S/qedP0S3HbcSqLM8bscA+h9cUH1L+cxMA4nmtA6kypsAEzM/ckj9SKja0buN4IJPac/wBwJpgFbMSWvQmiwEUA3DuHO1ZD/TcRAovYsPc3bQVYjgSVC4AAEElQJ9eDUrnRzav20Uh4t75iBMsoYzIABG4TjArVcsjDW97K9wQzSMKQSQY3bT4hz3mfSksRLEUjqeWPMrO4CKg8NPrImAeI8xPuw71ouam2NhZWbmVXLnsqD8D7Gsl+21y8tqYgkkfKIB8qqJwJEn6Sc0W1XSbiKNRbuhgCD5ZB2+/t5f1pRAuzLsbcEpezGzpdtkt27bhrflY3AzbjbViGWSDu24YH0z2Bof8A9S7Ns6O6V3BwLbkfunayoW+oDkferOgaq2wfwVfxAhdwYkngbNskjJ59BXnxTqA9vUafbt/dYAsItHzFlU+XA2kQOJpyuAJzcmFy/H5nP/g3h29FA/7hH6TTQ3FLXwf8t1DEqyAfQ+JP6gUxXgQKncXnj1P+oCQVa+qKGBX1LZhfcIDU50XIHqKibs9vp/sfWrbjCB6dvv2NUMpiBXVE4xkhZZgDwCYHufaiqdPFu3mQ7ECTAWCfWr9Vp2ZLbhgyqNgIgQVWeBxJMD7TWjQArcNx2H7E8k+WSACo94J5x5TzSi5MeuIDuLer07W22tE54z3ioo57DP61r69rrd28TbWFEgZMESYgdgAQPeJxxVGmtEuqqYLMAD6SYn9acPx3JWA5UIWewgvott5AVQHClCYBLNDZmSRPoBxR/qtm1DXAB5gNyYEHaIjvyO3t60D1LoG2s7G4E8phjDGZMcjk+xiTWrqPTNVDh33EHdI+RpC5AiBgfXEdqmcWQbqXY9AgC5R0nptu87gkjbGBg+bAMwcKSJmt/R7Tpf8ABknbL+YEABYWCMRyfrxya86HoktW7lwvuJUqTkBQ2Dj96JBJzW3Xae4WS/ZA3rAZASNyzuBHmOCeADnBEERQMbsRqrxANbkum37V6xfv3VW2tswuwbXkmSxjPePqY7Cq9BbJth2v3LbFSVJ8yBVQOxI5PlAgDMsPSorqrTCPDu+bzMsQm/xCyggjaVAB+pn6Vn0fUYvozRtChQqnbtUxLLPLdz65pfH9RnLXcsHXtOHIBL+UZgKWbMyZwIIHHarn3tdIYhfmaFxhgCNrAmQdqn795rZ1PT2iVZwpZACGIiT3J/iWRj7+maenuDaa4gC3SpYFgPMqiNob2QYH+UVnIVaw/dfuMz/EDqEJtytyQHbIbb512k9wRt+wHpS+25zudix9SZq/X6kSWMSxJCgCecDAzHFEeiactba6Su7cF2cuEA3s/wB9pXHenD2rEH/Y1SuzpTaVbxXcJG4YgAEMVI7yIzHesetNtyzm4QDJ+TMxhRBP0k1r1t/9p4QlQJLAyeF/ZpE5OQCfasfUboDISoMQWUYBjsfb1rRoi4w7U10IL1elVCACSxAJ4ESAYjOc0R+Hr9u3uLpuONrD5licCcCcZycVb0rpjXrgNydrAncIknt+sk/SoHSbbuwzBfa2CDtB+YAjErnijZrFROPFu4XW5cuJcJO25c8IRO0BRJRRPYkKPv70RFp2tFgQAjeaDIUdpgd2WZ9/eqrNpTMHdaFtyxPmYsB5RHIPkVRjufWoX7rKpTdgrgKCBDuWkySSSIPpkRxU7EcblqKS4A+JV0l0F83rnmXbtA9ZEADHafSmM3XZTaIC23CtKkzAYSHEgwRJ99uKUjpjcYAMFVDLEmAJgZP4A9yKadPpmU3yLL7mhUNweUCFmbU7iSR3HpjmvAauezMBkofELdK6e5R0AtruXBth1YN/EpZyT3BjaPzWPUWrtm5Yt3QrHcEUFgXCsYUlwMoJ4+0nth1OsayLahrTnbLjwxtWYO3aYg5PEfTNHb3Srt+2uxUW5aZTuChAXglgu0cA7c+or2jodweJWmfo/wDZzz4duqty+R5QXXaO2S/6AGmDXvilPSTuvjA/akfSA4gf36UeN24balx32z6naDP4IrSKcmYQPTFSpr5r2sd67mvqQRe564tImNoEmJz39Y/WvbdrcQB3rxRAB5jj70Y+HVBJbjav5kgf1roZG4qTOSq8iBNPSOm3F8pIC+pXdtP8Qjvn/is3XukXghuFvJ8xGQWO5ocjifMf1rpHSbijTuuwEsB5u4/uKV/iltmjJE+byZJIALKWIE8kr+pqDDnY5B+5WUBQj6nNytNnRrSDSkhQ771uAgSUZcKk9uC0HnbEGcLHMU4dN0f7GUOxdz4iSZfaJJxgKMx68TXSydSTxxvcC9O0TbnfIa1kqZDkcNg+xJ+xpk0XWvGXZbG5kUsBmZkyxWPNg7Zn94c0OXSeE260zKe+ZmOxnmtXwrf2+KdiEyo3EebbuEqG7Ax6VPlIrkfiV4iQeIgrVnUW3UOh2gTsMkRjcI/d+UAjnEVuTqaOVAdVl5IJwRsXDGBElSCMTJ9qYOqvBCkBg0sRHPzoZ98zNJDv4pyAO2B2VQAP5n6msxtzFmMyWh1DSaw3XZFKB9rEAmCdvmADGQZH6lvUVDrPS0QnY5Y7jAByuQDOIMsTkSKwaWbBKIxh2hvqnDD0+c1qDM7IhYw2wYgc9zjMARWm711AUhu+4R6j010t2CrbrcDfMbjv8w37ZAbzFR37dprVq7gh7SqTtB8VhAVQVIdM9wxYCJ+c+grZr9Rus2rcQvirj323IJ9YgR7/AKAOtaplQIh2qxMgf5YA/wDI/mkr7u44kqNTNa06Xbw2owQQDtOQOAAWHcn/AJoheuKgOx4IfYQYjbMA7uOQfxWjp2lQeCkSbpG5j7kidvc470H1Ss+o8Jm4u7ZAAHLdhxR3zP8AUYV9JQvyZd0Fdt4XbkEbj24VQfNB/P2rCR411yqmGY7AewnAJ4BjmiiuFLsVDBbfB4JZlXPt5zih5ukwZzPbEfT0rA97jWwhdCFdPv0qQHQ3GJBUNvVE2xtJQ/MSexxH1rMGe9da+QsJsTAhQApOAeYVTP3mtGufdZVjG7fBMAEjaSN3rEc+9S0G02DvWQqBhBAYb2djkgxnBxkYrwa+5mTGFGvibWsbVR0Kk3QggYg7QTKRMEwZ9jWfqr7iX3TsCqP8xEAx95rdpbQD3g0Hw2jgAsELAgnOCLYx2n8pmp1TfsxJy2784oFXk0L1BiS/mMPRmVhBxF1LhEyxVDyR6AkHHp9KeunWyLjF9hByCfNMmScGchsHjg0hdPv+Cl+6BL3ALamSPDBcTA74P6A0zdEvG8qAko0hQyQDMAzBBB7YiMU4+0yLb3D/AP8AF2Hm5cTcdoVZJBKgkiIiGEx9FFS6r1IWrrlhiLWByFu4PByOTHc1t1HRnt2WuPe3lRuEWrSE7R3ZVmcRNIdvXXL7pbdvI9xZGOC/E8wNxAzQu3HQjcGJs1k9CKutsEPdYAQNXdSfVgSePof0ou95WCBT8oYf92P0j7QO1Bus4a+f/wC28I/0nn9a19OaQKzPG+MAe/qV6k+avqh1DD/avqBV1JWajP/Z"
                alt="Profile"
                className="w-16 h-16 rounded-full object-cover shadow-md"
              />
              <div>
                <h2 className="text-2xl font-bold text-gray-800 leading-tight">
                  Welcome back, {employerData.name}
                </h2>
                <p className="text-sm text-gray-500">{employerData.company}</p>
              </div>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-6 md:mt-0">
              {[
                { label: "Jobs Posted", value: employerData.totalJobs },
                { label: "Active Listings", value: employerData.activeListings },
                { label: "Applications", value: employerData.totalApplications },
                { label: "Hires", value: employerData.totalHires },
              ].map((item, i) => (
                <div key={i} className="bg-white shadow-sm border rounded-lg px-4 py-3 text-center">
                  <p className="text-lg font-semibold text-gray-800">{item.value}</p>
                  <p className="text-xs text-gray-500">{item.label}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Quick Actions */}
          <div className="mt-4">
            <h3 className="text-xl font-semibold text-gray-800 mb-4">Quick Actions</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {quickActions.map((action, index) => (
                <motion.div
                  key={index}
                  className="flex items-center gap-4 p-5 rounded-lg cursor-pointer shadow hover:shadow-md transition bg-white border"
                  whileHover={{ scale: 1.03 }}
                  onClick={() => navigate(action.path)}
                >
                  <div className={`p-3 rounded-full text-white ${action.color}`}>
                    {action.icon}
                  </div>
                  <span className="text-gray-800 font-medium">{action.label}</span>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Recent Jobs */}
          <div className="mt-10">
            <h3 className="text-xl font-semibold text-gray-800 mb-4">Recent Job Listings</h3>
            <div className="space-y-4">
              {employerData.recentJobs.map((job) => (
                <motion.div
                  key={job.id}
                  className="flex justify-between items-center bg-white border border-gray-200 rounded-lg p-5 shadow-sm hover:shadow-md transition-shadow"
                  whileHover={{ scale: 1.02 }}
                >
                  <div>
                    <h4 className="text-lg font-medium text-gray-800">{job.title}</h4>
                    <p className="text-sm text-gray-500">{job.location}</p>
                  </div>
                  <div className="flex items-center gap-4">
                    <span className="text-gray-500 text-sm">Apps: {job.applications}</span>
                    <span
                      className={`px-3 py-1 rounded-full text-xs font-medium ${job.status === "Open"
                        ? "bg-green-100 text-green-700"
                        : "bg-red-100 text-red-700"
                        }`}
                    >
                      {job.status}
                    </span>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
      <Footer />
    </>
  );
};

export default EmployerHome;
