import { message } from "antd";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router";
import { Spin, Tag } from "antd";

const getSpecifiedAyat = (surat, ayat) => {
	return axios.get(`https://api.quran.sutanlab.id/surah/${surat}/${ayat}`);
};

export default function SelectedAyat() {
	const { id, slug } = useParams();
	const [data, setData] = useState();
	const [isLoading, setIsLoading] = useState(false);

	useEffect(() => {
		if (id !== undefined && slug !== undefined) {
			setIsLoading(true);
			getSpecifiedAyat(slug, id)
				.then((response) => {
					console.log(response.data.data);
					setData(response.data.data);
					setIsLoading(false);
				})
				.catch((err) => message.warning(err.message));
		}
	}, [id, slug]);

	return (
		<div>
			{isLoading ? (
				<div className="flex justify-center items-center h-screen">
					<Spin size="large" />
				</div>
			) : (
				<>
					{data !== undefined ? (
						<>
							<div key={id} className="flex flex-col border-b px-6 py-4">
								<span className="mb-4">
									<Tag color="#108ee9">{data.number.inSurah}</Tag>
								</span>

								<p className="arabic text-right text-lg mb-2">{data.text.arab}</p>
								<p className="text-sm">{data.translation.id}</p>

								<div>
									<h6>Tafsir : </h6>
									<p>{data.tafsir.id.long}</p>
								</div>
							</div>
						</>
					) : (
						"Data tidak ada"
					)}
				</>
			)}
		</div>
	);
}
