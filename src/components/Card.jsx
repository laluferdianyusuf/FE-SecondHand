import React from "react";
import { Container, Card } from "react-bootstrap";
import { Link } from "react-router-dom";
export function CardProduct({ product }) {
  const title = {
    fontSize: "14px",
  };

  const image = {
    margin: "8px",
    height: "100px",
    width: "165px",
    borderRadius: "4px",
  };

  const accesoris = {
    fontSize: "11px",
    opacity: "0.5",
  };
  // const [filter, setFilter] = useState("");

  // const searchText = (e) => {
  //   setFilter(e.target.value);
  // };

  // let dataSearch = product.filter((item) => {
  //   return Object.keys(item).some((key) =>
  //     item[key]
  //       .toString()
  //       .toLowerCase()
  //       .includes(filter.toString().toLowerCase())
  //   );
  // });

  const styleSearch = {
    width: "27%",
  };

  return (
    <>
      {/* <div className="position-absolute" style={styleSearch}>
        <div className="search-bar position-relative">
          <FiSearch
            className="position-absolute"
            style={{ top: "11px", right: "10px", fontSize: "18px" }}
          />
          <input
            style={{ height: "40px", borderRadius: "16px" }}
            type="text"
            className="form-control"
            value={filter}
            onChange={searchText.bind(this)}
            placeholder="Cari Di sini..."
          />
        </div>
      </div> */}
      <Container className="card-content ">
        {product.map((product) => (
          <Link
            to={`/homeproduct/${product.id}`}
            className="text-decoration-none text-black"
          >
            <div key={product.id}>
              <Card>
                <Card.Img
                  variant="top"
                  className="align-self-center "
                  multiple
                  src={`${product.picture[0]}`}
                  style={image}
                />
                <Card.Body className="px-2 pt-0 pb-0">
                  <Card.Title className="mb-0" style={title}>
                    {product.name}
                  </Card.Title>
                  <p className="mb-0" style={accesoris}>
                    {product.category}
                  </p>
                  <Card.Text className="mb-1">Rp. {product.price}</Card.Text>
                </Card.Body>
              </Card>
            </div>
          </Link>
        ))}
      </Container>
    </>
  );
}
