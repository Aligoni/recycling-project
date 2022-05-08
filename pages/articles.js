import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { BsListUl } from 'react-icons/bs';
import { FaBoxes } from 'react-icons/fa';
import Footer from '../components/Footer';
import { server } from '../constants/server';
import axios from 'axios';
import CircularProgress from '@mui/material/CircularProgress';
import Navbar from '../components/Navbar';

import styles from '../styles/Articles.module.scss';

const Articles = () => {

	const router = useRouter();

	const [view, setView] = useState(false);

	const [loading, setLoading] = useState(true);
	const [articles, setArticles] = useState([]);
	const [toggleSearch, setToggleSearch] = useState(false);
	const [search, setSearch] = useState("");
	const [searchResults, setSearchResults] = useState([]);

	useEffect(() => {
		const getData = async () => {
			try {
				const articles = await axios.get(`${server}/articles`);
				console.log(articles.data);

				if (articles.status == 200) {
					setArticles(articles.data.data);
				}
				
				setLoading(false);
			} catch (error) {
				console.log(error);
				setLoading(false);
			}
		}
		getData();
	}, []);

	const onView = () => setView(true);
	const offView = () => setView(false);

	const handleSearch = e => setSearch(e.target.value);
	
	const onSubmit = async (e) => {
		e.preventDefault();
		setLoading(true);
		
		console.log(search);
		setToggleSearch(true);
		try {
			const searchData = await axios.get(`${server}/articles/search/${search}`);
			console.log(searchData.data);
			setSearchResults(searchData.data.data);
			setLoading(false);
		} catch (error) {
			console.log(error);
			setLoading(false);
		}
	}
	
	return (
		<>
			<div className={styles['articles-cont']}>
				<Navbar nothome={true} />
				<div className="w-full h-[30rem] flex justify-center items-center bg-[url('/assets/icon.jpg')] bg-cover bg-bottom relative">
					<div className='absolute w-full h-full bg-black bg-opacity-50'></div>
					<h1 className='text-6xl text-white z-10'>Articles</h1>
				</div>
				<div className={styles.content}>
					<form onSubmit={onSubmit}>
						<input type='text' placeholder='Search for article' value={search} onChange={handleSearch} />
						<button>Search</button>
					</form>

					<div className='flex justify-end items-center mx-8 my-4'>
						<div className='flex justify-center items-center'>
							<div onClick={offView} className={`border-solid border-2 border-gray-500 cursor-pointer px-2 py-1 rounded-l-md ${!view ? 'bg-gray-500' : ''}`}>
								<BsListUl />
							</div>
							<div onClick={onView} className={`border-solid border-2 border-gray-500 cursor-pointer px-2 py-1 rounded-r-md ${view ? 'bg-gray-500' : ''}`}>
								<FaBoxes />
							</div>
						</div>
					</div>
					{
						toggleSearch && (
							<div className='flex justify-end mr-8'>
								<span className='text-2xl cursor-pointer hover:bg-gray-100 px-4 py-2' onClick={() => {
									setToggleSearch(false)
									setSearch("");
								}}>x</span>
							</div>
						)
					}
					<div className={`${styles['all-articles']} ${view ? 'grid lg:grid-cols-4 md:grid-cols-2 gap-4 w-4/5 max-w-7xl mx-auto' : ''}`}>
						{
							loading ? <div className='my-8 w-full h-80 flex justify-center items-center'><CircularProgress className='text-black' /></div> :
							toggleSearch ? (
								searchResults.length == 0 ? (
									<div className='text-center h-40 text-2xl text-gray-500'>
										<h1>No articles found from search</h1>
									</div>
								) :
								!view ? (
									searchResults.map((article, i) => (
										<div 
											key={i}
											onClick={() => router.push(`/articles/${article.id}`)}
											className='flex justify-between items-center border-b-[1px] border-solid border-black p-4 w-4/5 max-w-7xl mx-auto hover:bg-gray-200 cursor-pointer' 
										>
											<div>
												<div className='flex items-center'>
													<p className='text-sm text-gray-500'>{article.admin.firstname} {article.admin.lastname}</p>
													<p className='text-sm text-gray-500 ml-16'>{article.date}</p>
												</div>
												<p className='text-3xl my-2'>{article.title}</p>
												<p>{article.summary}</p>
												<p className='text-sm text-gray-500 mt-2'>likes: {article.likes}</p>
											</div>
											<div className='w-20 h-20'>
												<img src={article.image} className='w-full h-full object-contain' />
											</div>
										</div>	
									))
								) : (
									searchResults.map((article, i) => (
										<div onClick={() => router.push(`/articles/${article.id}`)} className='overflow-hidden rounded-md shadow-md mt-4 cursor-pointer hover:shadow-xl h-80' key={i}>
											<div className='w-full h-[50%]'>
												<img src={article.image} className='w-full h-full object-contain' />
											</div>
											<div className='px-4 py-2'>
												<div className='flex justify-between items-center'>
													<p className='text-sm text-gray-500'>{article.admin.firstname} {article.admin.lastname}</p>
													<p className='text-sm text-gray-500 ml-16'>{article.date}</p>
												</div>
												<p className='text-3xl my-2'>{article.title}</p>
												<p>{article.summary}</p>
												<p className='text-sm text-gray-500 mt-2'>likes: {article.likes}</p>
											</div>
										</div>
									))
								)
							) :
							!view ? (
								articles.map((article, i) => (
									<div 
										key={i}
										onClick={() => router.push(`/articles/${article.id}`)}
										className='flex justify-between items-center border-b-[1px] border-solid border-black p-4 w-4/5 max-w-7xl mx-auto hover:bg-gray-200 cursor-pointer' 
									>
										<div>
											<div className='flex items-center'>
												<p className='text-sm text-gray-500'>{article.admin.firstname} {article.admin.lastname}</p>
												<p className='text-sm text-gray-500 ml-16'>{article.date}</p>
											</div>
											<p className='text-3xl my-2'>{article.title}</p>
											<p>{article.summary}</p>
											<p className='text-sm text-gray-500 mt-2'>likes: {article.likes}</p>
										</div>
										<div className='w-20 h-20'>
											<img src={article.image} className='w-full h-full object-contain' />
										</div>
									</div>	
								))
							) : (
								articles.map((article, i) => (
									<div onClick={() => router.push(`/articles/${article.id}`)} className='overflow-hidden rounded-md shadow-md mt-4 cursor-pointer hover:shadow-xl' key={i}>
										<div className='w-full h-[70%]'>
											<img src={article.image} className='w-full h-full object-contain' />
										</div>
										<div className='px-4 py-2'>
											<div className='flex justify-between items-center'>
												<p className='text-sm text-gray-500'>{article.admin.firstname} {article.admin.lastname}</p>
												<p className='text-sm text-gray-500 ml-16'>{article.date}</p>
											</div>
											<p className='text-3xl my-2'>{article.title}</p>
											<p>{article.preview}</p>
											<p className='text-sm text-gray-500 mt-2'>likes: {article.likes}</p>
										</div>
									</div>
								))
							)
						}
					</div>
					<div className='w-full mt-8'>
						<p className='text-center text-gray-500 text-sm'>{toggleSearch ? searchResults.length : articles.length} total articles</p>
					</div>
				</div>
				<Footer />
			</div>
		</>
	)
}

export default Articles;