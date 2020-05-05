import * as React from 'react';
import {ArticleListResponse} from '../common/ArticleListResponse';
import {Link} from 'react-router-dom';

export const ArticleList = () => {
	const [articles, setArticles] = React.useState<string[]>([]);
	React.useEffect(() => {
		fetch('/api/article/list')
			.then<ArticleListResponse>((response) => response.json())
			.then((articles) => setArticles(articles));
	}, [])

	return (
		<nav>
			<ul>
				{articles.map((item) => (
					<li>
						<Link to={`/article/${item}`}>{item}</Link>
					</li>
				))}
			</ul>
		</nav>
	)
}
