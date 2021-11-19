import React from "react";
import QRCode from "qrcode.react";
import { useRouter } from "next/router";

export default function RoomCode() {
	// function getURL() {
	// 	return typeof window !== "undefined" ? window.location : null;
	// }
	const { query, asPath } = useRouter();

	const code = String(query.id).substring(0, 5);
	const url = process.env.NEXT_PUBLIC_BASE_URL + asPath;

	return (
		<div class="roomcode">
			<div class="roomcode__box">
				<div class="roomcode__box--titlebox">
					<p class="title">Room Code</p>
				</div>
				<div class="roomcode__box--codebox">
					<p class="code">{code}</p>
				</div>
			</div>
			<div class="roomcode__box">
				<div class="roomcode__box--titlebox">
					<p class="title">Room QRcode</p>
				</div>
				<QRCode
					value={url}
					size={256}
					bgColor={"#fff"}
					fgColor={"#000"}
					level={"L"}
					includeMargin={true}
					renderAs={"canvas"}
				/>
			</div>
		</div>
	);
}
