import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Price } from 'src/database/entities/price.entity';
import Moralis from 'moralis';
import { Op } from 'sequelize';
import nodemailer from 'nodemailer';
import axios from 'axios';
import { Cron, Interval } from '@nestjs/schedule';
@Injectable()
export class PriceService {
  constructor(@InjectModel(Price) private priceModel: typeof Price) {}

  private readonly apiUrl = process.env.CMC_FETCHING_PRICE_URL; // Your CoinMarketCap fetching price URL
  private readonly apiKey = process.env.CMC_PRO_API_KEY; // Your CoinMarketCap API key

  async fetchPrice(symbol: string): Promise<any> {
      try {
          const response = await axios.get(`${this.apiUrl}?convert=usd&symbol=${symbol}`, {
              headers: {
                  Accept: 'application/json',
                  'X-CMC_PRO_API_KEY': this.apiKey,
              },
          });

          if (response) {
              const data = response.data;
              if(symbol==="ETH")
              {
                 return data.data.ETH.quote.USD.price
              }
                
              if(symbol==="MATIC")
                {
                  return data.data.MATIC.quote.USD.price
                }
                if(symbol==="BTC")
                  {
                    return data.data.BTC.quote.USD.price
                  }
  
              

          }
      } catch (err) {
          throw new HttpException(err.response?.data?.status?.error_message || 'Error fetching price', HttpStatus.INTERNAL_SERVER_ERROR);
      }
  }  
  async updatePrices() {
    console.log("🚀 ~ PriceService ~ updatePrices ~ updatePrices:")
    const ethPrice = await this.fetchPrice('ETH');
    console.log("🚀 ~ PriceService ~ updatePrices ~ ethPrice:", ethPrice)
    const polygonPrice = await this.fetchPrice('MATIC');
    console.log("🚀 ~ PriceService ~ updatePrices ~ polygonPrice:", polygonPrice)
    await this.priceModel.create({ chain: 'ethereum', price: ethPrice });
    await this.priceModel.create({ chain: 'polygon', price: polygonPrice });
  }

  async getHourlyPrices(chain: string) {
    const oneDayAgo = new Date(Date.now() - 24 * 60 * 60 * 1000);
    return this.priceModel.findAll({
      where: { chain, createdAt: { [Op.gte]: oneDayAgo } },
      order: [['createdAt', 'ASC']],
    });
  }

  async getSwapRate(ethAmount: number) {
    const ethPrice = await this.fetchPrice('ETH');
    const btcPrice = await this.fetchPrice('BTC');
    const btcAmount = (ethAmount * ethPrice) / btcPrice;
    const fee = ethAmount * 0.03;
    return {
      btcAmount,
      feeEth: fee,
      feeUsd: fee * ethPrice,
    };
  }
}