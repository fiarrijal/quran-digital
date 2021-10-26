import axios from "axios";
import { useEffect, useState, Fragment } from "react";
import { useHistory } from "react-router-dom";

function ListSurat() {
	const [data, setData] = useState([]);
	const history = useHistory();

	const getQuran = () => {
		return axios.get(`https://api.quran.sutanlab.id/surah`);
	};

	useEffect(() => {
		getQuran().then((response) => {
			console.log(response.data.data);
			setData(response.data.data);
		});
	}, []);

	return (
		<div>
			{data !== undefined && (
				<Fragment>
					{data.map((item) => {
						return (
							<div key={item.number} className="flex items-center bg-gray-50 border border-gray-600 p-4" onClick={() => history.push(`/surat/${item.number}`)}>
								<div className="mr-4">
									<h3 className="font-bold text-xl text-gray-600">{item.number}</h3>
								</div>
								<div className="text-left">
									<p className="text-gray-400 text-sm font-semibold">
										Surat {item.name.transliteration.id} ({item.name.translation.id})
									</p>
									<p className="text-gray-600 text-sm">
										Surat {item.revelation.id}. {item.numberOfVerses} ayat
									</p>
								</div>
							</div>
						);
					})}
				</Fragment>
			)}
		</div>
	);
}

export default ListSurat;
