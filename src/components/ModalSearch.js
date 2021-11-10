import React, { useState, useEffect } from "react";
import { InputNumber, Modal, Select, Spin, message } from "antd";
import axios from "axios";
import { useHistory } from "react-router";

const { Option } = Select;

const getQuran = () => {
	return axios.get(`https://api.quran.sutanlab.id/surah`);
};

export default function ModalSearch(props) {
	const [quran, setQuran] = useState([]);
	const [surat, setSurat] = useState();
	const [ayat, setAyat] = useState();
	const [isLoading, setIsLoading] = useState(false);
	const history = useHistory();

	useEffect(() => {
		setIsLoading(true);
		getQuran()
			.then((response) => {
				// console.log(response.data.data);
				setQuran(response.data.data);
				setIsLoading(false);
			})
			.catch((err) => alert(err.message));
	}, []);

	function onChange(value) {
		// console.log(`selected ${value}`);
		setAyat(value);
	}
	const handleOk = () => {
		const selected = quran
			?.filter((item) => {
				return item.number === surat;
			})
			?.map((item) => {
				return { number: item.number, totalAyat: item.numberOfVerses };
			});

		const dataSelected = selected[0];

		if (ayat > dataSelected.totalAyat) {
			message.warning(`Ayat paling terakhir yaitu ${dataSelected.totalAyat}`);
		} else if (ayat === undefined) {
			history.push(`surat/${surat}`);
		} else {
			history.push(`surat/${surat}/${ayat}`);
		}
	};
	return (
		<>
			{isLoading ? (
				<Spin tip="Loading" />
			) : (
				<div>
					<Modal title="Cari Surat & Ayat" visible={props.visible} onOk={handleOk} onCancel={props.onCancel}>
						<div className="form-control">
							<SelectData
								placeholder="Pilih Surat"
								name="surat"
								onChange={(value) => {
									setSurat(parseInt(value));
								}}
							>
								{quran?.map((item) => {
									const { number } = item;
									return (
										<Option key={number}>
											{number}. {item.name.transliteration.id}
										</Option>
									);
								})}
							</SelectData>
							<InputNumber placeholder="Pilih ayat" min={1} value={ayat} onChange={onChange} />
						</div>
					</Modal>
				</div>
			)}
		</>
	);
}

function SelectData(props) {
	return (
		<Select
			name={props.name}
			showSearch
			style={{ width: 200 }}
			placeholder={props.placeholder}
			optionFilterProp="children"
			onChange={props.onChange}
			// filterOption={(input, option) => option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}
		>
			{props.children}
		</Select>
	);
}
