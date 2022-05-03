import { useState } from 'react';
import { articles } from '../constants/articles';
import { BsListUl } from 'react-icons/bs';
import { FaBoxes } from 'react-icons/fa';

import styles from '../styles/Articles.module.scss';

const Articles = () => {

	const [view, setView] = useState(false);

	const onView = () => setView(true);
	const offView = () => setView(false);
	
	const onSubmit = (e) => {
		e.preventDefault();
	}
	
	return (
		<div className={styles['articles-cont']}>
			<div className="w-full h-[30rem] flex justify-center items-center bg-[url('/assets/icon.jpg')] bg-cover bg-bottom relative">
				<div className='absolute w-full h-full bg-black bg-opacity-50'></div>
				<h1 className='text-6xl text-white z-10'>Articles</h1>
			</div>
			<div className={styles.content}>
				<form onSubmit={onSubmit}>
					<input type='text' placeholder='Search for article'  />
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
				<div className={`${styles['all-articles']} ${view ? 'grid lg:grid-cols-4 md:grid-cols-2 gap-4 w-4/5 max-w-7xl mx-auto' : ''}`}>
					{
						!view ? (
							articles.map((article, i) => (
								<div className='flex justify-between items-center border-b-[1px] border-solid border-black p-4 w-4/5 max-w-7xl mx-auto hover:bg-gray-200 cursor-pointer' key={i}>
									<div>
										<div className='flex items-center'>
											<p className='text-sm text-gray-500'>{article.author}</p>
											<p className='text-sm text-gray-500 ml-16'>{article.date}</p>
										</div>
										<p className='text-3xl my-2'>{article.title}</p>
										<p>{article.preview}</p>
										<p className='text-sm text-gray-500 mt-2'>{article.read}</p>
									</div>
									<div className='w-20 h-20'>
										<img src={article.img} className='w-full h-full' />
									</div>
								</div>
							))
						) : (
							articles.map((article, i) => (
								<div className='overflow-hidden rounded-md shadow-md mt-4 cursor-pointer hover:shadow-xl' key={i}>
									<div className=''>
										<img src={article.img} className='' />
									</div>
									<div className='px-4 py-2'>
										<div className='flex justify-between items-center'>
											<p className='text-sm text-gray-500'>{article.author}</p>
											<p className='text-sm text-gray-500 ml-16'>{article.date}</p>
										</div>
										<p className='text-3xl my-2'>{article.title}</p>
										<p>{article.preview}</p>
										<p className='text-sm text-gray-500 mt-2'>{article.read}</p>
									</div>
								</div>
							))
						)
					}
				</div>
				<div className='w-full mt-8'>
					<p className='text-center text-gray-500 text-sm'>{articles.length} total articles</p>
				</div>
			</div>
		</div>
	)
}

export default Articles;