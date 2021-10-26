import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router";

const getSurat = (id) => {
	return axios.get(`https://api.quran.sutanlab.id/surah/${id}`);
};

export default function DetailSurat(props) {
	const { id } = useParams();
	const [surat, setSurat] = useState();

	useEffect(() => {
		if (id !== undefined) {
			getSurat(id).then((response) => {
				console.log(response.data.data);
				setSurat(response.data);
			});
		}
	}, [id]);

	return (
		<div>
			{surat !== undefined && (
				<div>
					{surat.data.preBismillah !== null ? <p className="arabic text-center text-lg border-b   px-6 py-4 mb-2">{surat.data.preBismillah?.text.arab} </p> : null}
					{surat.data.verses.map((item) => {
						return (
							<div key={item.number.inSurah} className="flex flex-col border-b px-6 py-4">
								<span className="mb-4">Ayat ke -{item.number.inSurah}</span>
								<p className="arabic text-right text-lg mb-2">{item.text.arab}</p>
								<p className="text-sm">{item.translation.id}</p>
							</div>
						);
					})}
				</div>
			)}
		</div>
	);
}
