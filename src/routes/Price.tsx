import { prependOnceListener } from "process";
import { useQuery } from "react-query";
import styled from "styled-components";
import { fetchCoinTickers } from "../api";

const PriceList = styled.ul``;

const PriceOne = styled.li`
  display: flex;
  flex-direction: column;
  background-color: white;
  padding: 10px 20px;
  color: ${(props) => props.theme.bgColor};
  margin-bottom: 10px;
  border-radius: 15px;
  border: 2px solid ${(props) => props.theme.accentColor};
  span:first-child {
    font-size: 15px;
    margin-bottom: 10px;
    /* color: ${(props) => props.theme.accentColor}; */
  }
  span:last-child {
    font-size: 25px;
  }
`;

interface PriceData {
  id: string;
  name: string;
  symbol: string;
  rank: number;
  circulating_supply: number;
  total_supply: number;
  max_supply: number;
  beta_value: number;
  first_data_at: string;
  last_updated: string;
  quotes: {
    USD: {
      ath_date: string;
      ath_price: number;
      market_cap: number;
      market_cap_change_24h: number;
      percent_change_1h: number;
      percent_change_1y: number;
      percent_change_6h: number;
      percent_change_7d: number;
      percent_change_12h: number;
      percent_change_15m: number;
      percent_change_24h: number;
      percent_change_30d: number;
      percent_change_30m: number;
      percent_from_price_ath: number;
      price: number;
      volume_24h: number;
      volume_24h_change_24h: number;
    };
  };
}

interface PriceProps {
  coinId: string;
}

function Price({ coinId }: PriceProps) {
  const { isLoading, data: priceData } = useQuery<PriceData>(
    ["price", coinId],
    () => fetchCoinTickers(coinId),
    { refetchInterval: 5000 }
  );
  return (
    <div>
      {isLoading ? (
        "Loading prices..."
      ) : (
        <PriceList>
          <PriceOne>
            <span>Market Cap</span>
            <span>${priceData?.quotes.USD.market_cap.toLocaleString()}</span>
          </PriceOne>
          <PriceOne>
            <span>All Time High (Price)</span>
            <span>${priceData?.quotes.USD.ath_price.toFixed(3)}</span>
          </PriceOne>
          <PriceOne>
            <span>All Time High (Date)</span>
            <span>{priceData?.quotes.USD.ath_date.toLocaleLowerCase()}</span>
          </PriceOne>
        </PriceList>
      )}
    </div>
  );
}
export default Price;
