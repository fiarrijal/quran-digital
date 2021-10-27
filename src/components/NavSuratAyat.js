import React from "react";
import { ArrowLeftOutlined } from "@ant-design/icons";
import { Button } from "antd";

import { useHistory } from "react-router";

export default function NavSuratAyat(props) {
	const history = useHistory();
	return (
		<>
			<div className="h-12 bg-gray-700 text-white px-4 flex items-center fixed w-screen top-0 z-10">
				<Button className="bg-transparent border-0" shape="circle" icon={<ArrowLeftOutlined className="text-lg font-semibold text-white" />} onClick={() => history.push("/")}></Button>
				<span className="text-xl font-semibold ml-4">{props.title}</span>
			</div>
		</>
	);
}
