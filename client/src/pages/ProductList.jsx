import React, { useState } from "react";
import { useLocation } from "react-router";
import styled from "styled-components";
import { mobile } from "../responsive";

import Announcement from "../components/Announcement";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import Newsletter from "../components/Newsletter";
import Products from "../components/Products";

const Container = styled.div``;

const Title = styled.h1`
  margin: 20px;
`;

const FilterContainer = styled.div`
  display: flex;
  justify-content: space-between;
`;

const Filter = styled.div`
  margin: 20px;
  ${mobile({ margin: "0px 20px", display: "flex", flexDirection: "column" })}
`;

const FilterText = styled.span`
  font-size: 20px;
  font-weight: 600;
  margin-right: 20px;
  ${mobile({ marginRight: "0px" })}
`;

const Select = styled.select`
  padding: 10px;
  margin-right: 20px;
  ${mobile({ margin: "10px 0px" })}
`;

const Option = styled.option``;

const ProductList = () => {
  const location = useLocation();
  // console.log(location.pathname.split("/")[2])
  const category = location.pathname.split("/")[2].toUpperCase();
  const [filters, setFilters] = useState({});
  const [sort, setSort] = useState("NEWEST");

  const handleFilters = (e) => {
    const value = e.target.value;
    setFilters({
      ...filters, // to set color and size together
      [e.target.name]: value,
    });
  };

  // console.log(filters);

  return (
    <Container>
      <Navbar />
      <Announcement />
      <Title>{category.slice(0, 1) + category.slice(1, category.length).toLowerCase()}</Title>
      <FilterContainer>
        <Filter>
          <FilterText>Filter Products:</FilterText>
          <Select name="color" onChange={handleFilters}>
            <Option>COLOR</Option>
            <Option>WHITE</Option>
            <Option>BLACK</Option>
            <Option>BLUE</Option>
            <Option>RED</Option>
            <Option>YELLOW</Option>
            <Option>GREEN</Option>
          </Select>
          <Select name="size" onChange={handleFilters}>
            <Option>SIZE</Option>
            <Option>XS</Option>
            <Option>S</Option>
            <Option>M</Option>
            <Option>L</Option>
            <Option>XL</Option>
            <Option>XXL</Option>
          </Select>
        </Filter>
        <Filter>
          <FilterText>Sort Products:</FilterText>
          <Select onChange={(e) => setSort(e.target.value)}>
            <Option value="NEWEST">NEWEST</Option>
            <Option value="ASC">PRICE (ASC)</Option>
            <Option value="DESC">PRICE (DESC)</Option>
          </Select>
        </Filter>
      </FilterContainer>
      {/* use al of this values in Products component */}
      <Products category={category} filters={filters} sort={sort} />
      <Newsletter />
      <Footer />
    </Container>
  );
};

export default ProductList;
