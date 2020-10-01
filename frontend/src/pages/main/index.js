import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import api from '../../service/api';

import './styles.css';

export default class index extends Component {
  constructor(props) {
    super(props);

    this.state = {
      products: [],
      productInfo: {},
      page: 1,
    };
  }

  componentDidMount() {
    this.loadProducts();
  }

  loadProducts = async (page = 1) => {
    const response = await api.get(`/product?page=${page}`);

    const { docs, ...productInfo } = response.data;

    this.setState({
      products: docs,
      productInfo,
      page,
    });
  };

  prevPage = () => {
    const { page } = this.state;

    if (page === 1) return;

    const pageNumber = page - 1;

    this.loadProducts(pageNumber);
  };

  nextPage = () => {
    const { page, productInfo } = this.state;

    if (page === productInfo.pages) return;

    const pageNumber = page + 1;

    this.loadProducts(pageNumber);
  };

  render() {
    const { products, page, productInfo } = this.state;

    return (
      <div className="product-list">
        {products.map((product) => (
          <article>
            <strong>{product.title}</strong>
            <p>{product.description}</p>
            <Link to={`/products/${product.id}`}>Acessar</Link>
          </article>
        ))}

        <div className="actions">
          <button type="button" onClick={this.prevPage} disabled={page === 1}>
            Anterior
          </button>
          <button
            type="button"
            onClick={this.nextPage}
            disabled={page === productInfo.pages}
          >
            Proximo
          </button>
        </div>
      </div>
    );
  }
}
