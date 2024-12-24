import { Fragment, useEffect, useState, useContext } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useLocation } from 'react-router-dom'; // Add useLocation
import { Button, Menu, Dropdown, Pagination } from 'antd';
import { setCategoryFilter, setPriceRangeFilter } from '../redux/slices/filterSlice';
import ProductCard from '../components/ProductCard';
import { PlusOutlined, FilterOutlined } from '@ant-design/icons';
import { AuthContext } from '../context/AuthContext';

export default function Home() {
    const dispatch = useDispatch();
    const { category, priceRange } = useSelector((state) => state.filter);
    const [products, setProducts] = useState([]);
    const [filteredPosts, setFilteredPosts] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [pageSize, setPageSize] = useState(10);
    const navigate = useNavigate();
    const location = useLocation(); // To access the current URL
    const { auth } = useContext(AuthContext);

    // Get the search keyword from the URL query string
    const searchParams = new URLSearchParams(location.search);
    const keyword = searchParams.get('keyword') || '';

    // Fetch products from the API
    useEffect(() => {
        fetch(process.env.REACT_APP_API_URL + '/products')
            .then(res => res.json())
            .then(res => setProducts(res.products));
    }, []);

    // Filter products based on category, price range, and search keyword
    useEffect(() => {
        let filtered = [...products];

        // Filter by category
        if (category !== 'All') {
            filtered = filtered.filter(product => product.category === category);
        }

        // Filter by price range
        if (priceRange !== 'All') {
            const [minPrice, maxPrice] = priceRange.split('-').map(Number);
            if (maxPrice) {
                filtered = filtered.filter(product => product.price >= minPrice && product.price <= maxPrice);
            } else {
                filtered = filtered.filter(product => product.price >= minPrice);
            }
        }

        // Filter by search keyword
        if (keyword) {
            filtered = filtered.filter(product =>
                product.name.toLowerCase().includes(keyword.toLowerCase())
            );
        }

        setFilteredPosts(filtered);
    }, [category, priceRange, products, keyword]);

    const handleCategoryFilter = (category) => {
        dispatch(setCategoryFilter(category));
    };

    const handlePriceRangeFilter = (priceRange) => {
        dispatch(setPriceRangeFilter(priceRange));
    };

    const handlePageChange = (page) => {
        setCurrentPage(page);
    };

    const handleCreate = () => {
        navigate('/create');
    };

    const categoryMenu = (
        <Menu>
            <Menu.Item onClick={() => handleCategoryFilter('Laptops')}>Laptops</Menu.Item>
            <Menu.Item onClick={() => handleCategoryFilter('Accessories')}>Accessories</Menu.Item>
            <Menu.Item onClick={() => handleCategoryFilter('Headphones')}>Headphones</Menu.Item>
            <Menu.Item onClick={() => handleCategoryFilter('Sports')}>Sports</Menu.Item>
            <Menu.Item onClick={() => handleCategoryFilter('Mobile Phones')}>Mobile Phones</Menu.Item>
            <Menu.Item onClick={() => handleCategoryFilter('All')}>Clear Filter</Menu.Item>
        </Menu>
    );

    const priceRangeMenu = (
        <Menu>
            <Menu.Item onClick={() => handlePriceRangeFilter('0-50')}>$0 - $50</Menu.Item>
            <Menu.Item onClick={() => handlePriceRangeFilter('50-100')}>$50 - $100</Menu.Item>
            <Menu.Item onClick={() => handlePriceRangeFilter('100-200')}>$100 - $200</Menu.Item>
            <Menu.Item onClick={() => handlePriceRangeFilter('200')}>$200+</Menu.Item>
            <Menu.Item onClick={() => handlePriceRangeFilter('All')}>Clear Filter</Menu.Item>
        </Menu>
    );

    const paginateProducts = filteredPosts.slice(
        (currentPage - 1) * pageSize,
        currentPage * pageSize
    );

    return (
        <Fragment>
            <div className='home'>
                <div className='home-container'>
                    <div className="list">
                        {auth && (
                            <Button className="create" onClick={handleCreate}>
                                <PlusOutlined /> Create
                            </Button>
                        )}
                        <Dropdown overlay={categoryMenu} trigger={['click']} className="filter">
                            <Button><FilterOutlined /> Category Filter</Button>
                        </Dropdown>
                        <Dropdown overlay={priceRangeMenu} trigger={['click']} className="filter">
                            <Button><FilterOutlined /> Price Filter</Button>
                        </Dropdown>
                    </div>
                    <hr width="90%" size="2" color="whitesmoke" noshade />
                    <section id="products" className="container">
                        <div className="home-row">
                            {paginateProducts.map(product => <ProductCard key={product.id} product={product} />)}
                        </div>
                    </section>
                    <Pagination
                        current={currentPage}
                        pageSize={pageSize}
                        total={filteredPosts.length}
                        onChange={handlePageChange}
                        showSizeChanger
                        onShowSizeChange={(current, size) => setPageSize(size)}
                        pageSizeOptions={['10', '20', '30']}
                    />
                </div>
            </div>
        </Fragment>
    );
}
