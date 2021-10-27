import React, { useState } from "react";
import { SearchOutlined } from "@ant-design/icons";
import { Button } from "antd";
import ModalSearch from "./ModalSearch";

export default function NavFrontPage() {
	const [isModalVisible, setIsModalVisible] = useState(false);

	const showModal = () => {
		setIsModalVisible(true);
	};

	const handleCancel = () => {
		setIsModalVisible(false);
	};

	return (
		<>
			<ModalSearch visible={isModalVisible} onCancel={handleCancel} />
			<div className="h-12 bg-gray-700 text-white px-4 flex justify-between items-center fixed w-screen top-0 z-10">
				<span className="text-xl font-semibold">Qur'an</span>
				<ul>
					<li key="search">
						<Button className="bg-transparent border-0" shape="circle" icon={<SearchOutlined className="text-lg font-semibold text-white" />} onClick={showModal}></Button>
					</li>
				</ul>
			</div>
		</>
	);
}
