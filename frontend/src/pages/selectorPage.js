import { Selector } from '../components/selector/selector3'

export default function SelectorPage() {
    return (
        <div className="container flex justify-center">
            <div className="w-1/2">
                <h1 className="text-4xl text-black-400 p-4 font-bold text-center font-serif">
                    Photographer selection
        </h1>
                <Selector />
            </div>
        </div>
    );
}

export async function getServerSideProps() {
    const res = await fetch(`http://localhost:3000/?date=2020-11-25&bookingId=3`)
    const json = await res.json()
    return { props: { json } }
}