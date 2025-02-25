// eslint-disable-next-line @next/next/no-document-import-in-page
import Document, { Html, Head, Main, NextScript } from 'next/document'

class MyDocument extends Document {
	render() {
		return (
			<Html lang="en">
				<Head>
					<link
						rel="preconnect"
						href="https://api.stockanalysis.com"
						crossOrigin=""
					/>
					{process.env.NEXT_PUBLIC_GTM_ID && (
						<script
							dangerouslySetInnerHTML={{
								__html: `(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src='https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);})(window,document,'script','dataLayer','${process.env.NEXT_PUBLIC_GTM_ID}');`
							}}
						/>
					)}
					{process.env.NEXT_PUBLIC_GTM_ID && (
						<script
							async
							src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-7702053427535735"
							crossOrigin="anonymous"
						></script>
					)}
				</Head>
				<body>
					{process.env.NEXT_PUBLIC_GTM_ID && (
						<noscript
							dangerouslySetInnerHTML={{
								__html: `<iframe src="https://www.googletagmanager.com/ns.html?id=${process.env.NEXT_PUBLIC_GTM_ID}"
        height="0" width="0" style="display:none;visibility:hidden"></iframe>`
							}}
						></noscript>
					)}
					<Main />
					<NextScript />
				</body>
			</Html>
		)
	}
}

export default MyDocument
