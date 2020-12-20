// tslint:disable:interface-name
import { Agent } from 'http';
declare module 'binance-client' {
    export default function (options?: { httpBase?: string, httpFutureBase?: string, apiKey: string; apiSecret: string, getTime?: () => number | Promise<number> }): Binance;

    export enum ErrorCodes {
        UNKNOWN = -1000,
        DISCONNECTED = -1001,
        UNAUTHORIZED = -1002,
        TOO_MANY_REQUESTS = -1003,
        UNEXPECTED_RESP = -1006,
        TIMEOUT = -1007,
        INVALID_MESSAGE = -1013,
        UNKNOWN_ORDER_COMPOSITION = -1014,
        TOO_MANY_ORDERS = -1015,
        SERVICE_SHUTTING_DOWN = -1016,
        UNSUPPORTED_OPERATION = -1020,
        INVALID_TIMESTAMP = -1021,
        INVALID_SIGNATURE = -1022,
        ILLEGAL_CHARS = -1100,
        TOO_MANY_PARAMETERS = -1101,
        MANDATORY_PARAM_EMPTY_OR_MALFORMED = -1102,
        UNKNOWN_PARAM = -1103,
        UNREAD_PARAMETERS = -1104,
        PARAM_EMPTY = -1105,
        PARAM_NOT_REQUIRED = -1106,
        NO_DEPTH = -1112,
        TIF_NOT_REQUIRED = -1114,
        INVALID_TIF = -1115,
        INVALID_ORDER_TYPE = -1116,
        INVALID_SIDE = -1117,
        EMPTY_NEW_CL_ORD_ID = -1118,
        EMPTY_ORG_CL_ORD_ID = -1119,
        BAD_INTERVAL = -1120,
        BAD_SYMBOL = -1121,
        INVALID_LISTEN_KEY = -1125,
        MORE_THAN_XX_HOURS = -1127,
        OPTIONAL_PARAMS_BAD_COMBO = -1128,
        INVALID_PARAMETER = -1130,
        BAD_API_ID = -2008,
        DUPLICATE_API_KEY_DESC = -2009,
        INSUFFICIENT_BALANCE = -2010,
        CANCEL_ALL_FAIL = -2012,
        NO_SUCH_ORDER = -2013,
        BAD_API_KEY_FMT = -2014,
        REJECTED_MBX_KEY = -2015,
    }

    export interface Account {
        balances: AssetBalance[];
        buyerCommission: number;
        canDeposit: boolean;
        canTrade: boolean;
        canWithdraw: boolean;
        makerCommission: number;
        sellerCommission: number;
        takerCommission: number;
        updateTime: number;
    }
    export interface TradeFee {
        symbol: string;
        maker: number;
        taker: number;
    }
    export interface TradeFeeResult {
        tradeFee: TradeFee[]
        success: boolean
    }
    export interface AggregatedTrade {
        aggId: number;
        price: string;
        quantity: string;
        firstId: number;
        lastId: number;
        time: number;
        isBuyerMaker: boolean;
    }

    export type FAggregatedTrade = AggregatedTrade;

    interface Trade {
        id: number,
        price: string,
        quantity: string,
        quoteQty: string,
        time: number,
        isBuyerMaker: boolean,
        isBestMatch: boolean // TODO: verify
    }

    interface FTrade {
        id: number,
        price: string,
        quantity: string,
        quoteQty: string,
        time: number,
        isBuyerMaker: boolean
    }

    export interface FMarkPrice {
        symbol: string,
        markPrice: string,
        lastFundingRate: string
        nextFundingTime: number,
        time: number
    }

    export interface FFundingRate {
        symbol: string,
        fundingRate: string,
        fundingTime: number,
        time: number
    }

    interface FDailyState {
        symbol: string,
        priceChange: string,
        priceChangePercent: string,
        weightedAvgPrice: string,
        prevClosePrice: string,
        lastPrice: string,
        lastQty: string,
        openPrice: string,
        highPrice: string,
        lowPrice: string,
        volume: string,
        quoteVolume: string,
        openTime: number,
        closeTime: number,
        firstId: number,   // First tradeId
        lastId: number,    // Last tradeId
        count: number
    }

    interface FPrice {
        symbol: string,
        price: string,
        time: number
    }

    interface FReducedPrice {
        [symbol: string]: FPrice
    }

    interface FBookTicker {
        symbol: string,
        bidPrice: string,
        bidQty: string,
        askPrice: string,
        askQty: string
    }

    interface FReducedBookTicker {
        [symbol: string]: FBookTicker
    }

    interface FForceOrder {
        symbol: string, // SYMBOL
        price: string, // ORDER_PRICE
        origQty: string, // ORDER_AMOUNT
        executedQty: string, // FILLED_AMOUNT
        averagePrice: string, // AVG_PRICE
        status: FOrderStatus,
        timeInForce: FTimeInForce,
        type: FOrderType,
        side: FOrderSide,
        time: number
    }

    interface FOpenInterest {
        symbol: string,
        openInterest: string
    }

    interface FLeverageBrackets {
        symbol: string,
        brackets: FLeverageBracket[]
    }

    interface FLeverageBracket {
        bracket: number,
        initialLeverage: number,  // Max initial leverage for this bracket
        notionalCap: number,  // Cap notional of this bracket
        notionalFloor: number,  // Notionl threshold of this bracket
        maintMarginRatio: number // Maintenance ratio for this bracket
    }

    interface FReducedLeverageBrackets {
        [symbol: string]: FLeverageBracket[]
    }

    interface FAccountTransfer {
        tranId: number
    }

    interface FAccountHistoryTransfer {
        asset: string,
        tranId: number,
        amount: string,
        type: string,
        timestamp: number,
        status: string
    }

    interface FAccountTransferHistory {
        rows: FAccountHistoryTransfer[],
        total: number
    }

    export interface AssetBalance {
        asset: string;
        free: string;
        locked: string;
    }

    export interface DepositAddress {
        address: string,
        addressTag: string,
        asset: string,
        success: boolean,
    }

    export interface WithrawResponse {
        id: string;
        msg: string;
        success: boolean;
    }

    export enum DepositStatus {
        PENDING = 0,
        SUCCESS = 1,
    }

    export interface DepositHistoryResponse {
        depositList:
        {
            insertTime: number,
            amount: number;
            asset: string;
            address: string;
            txId: string;
            status: DepositStatus;
        }[];
        success: boolean,
    }

    export enum WithdrawStatus {
        EMAIL_SENT = 0,
        CANCELLED = 1,
        AWAITING_APPROVAL = 2,
        REJECTED = 3,
        PROCESSING = 4,
        FAILURE = 5,
        COMPLETED = 6,
    }

    export interface WithdrawHistoryResponse {
        withdrawList:
        {
            id: string;
            amount: number;
            address: string;
            asset: string;
            txId: string;
            applyTime: number;
            status: WithdrawStatus;
        }[];
        success: boolean,
    }

    export interface AssetDetail {
        success: boolean,
        assetDetail: {
            [asset: string]: {
                minWithdrawAmount: string;
                depositStatus: boolean;
                withdrawFee: number;
                withdrawStatus: boolean;
                depositTip: string;
            }
        }
    }

    export interface FWSUserMarginCallEventPosition{
        symbol: string,
        positionSide: FPositionSide,
        positionAmount: string,
        marginType: string,
        isolatedWallet: string,
        markPrice: string,
        unrealizedPnL: string,
        maintenanceMarginRequired: string
    }
    export interface FWSUserMarginCallEventData {
        eventType: 'MARGIN_CALL',
        eventTime: number,
        crossWalletBalance: string,
        positions: FWSUserMarginCallEventPosition[]
    }

    export type FSWUserAccountUpdateEventReasonType =
        | 'DEPOSIT'
        | 'WITHDRAW'
        | 'ORDER'
        | 'FUNDING_FEE'
        | 'WITHDRAW_REJECT'
        | 'ADJUSTMENT'
        | 'INSURANCE_CLEAR'
        | 'ADMIN_DEPOSIT'
        | 'ADMIN_WITHDRAW'
        | 'MARGIN_TRANSFER'
        | 'MARGIN_TYPE_CHANGE'
        | 'ASSET_TRANSFER'
        | 'OPTIONS_PREMIUM_FEE'
        | 'OPTIONS_SETTLE_PROFIT';

    export interface FWSUserAccountUpdateBalance {
        asset: string,
        balance: string,
        crossWalletBalance: string
    }

    export interface FWSUserAccountUpdatePosition {
        symbol: string,
        positionAmount: string,
        entryPrice: string,
        preAccumulatedRealizedFee: string,
        marginType: string,
        isolatedWallet: string,
        positionSide: FPositionSide,
    }
    export interface FWSUserAccountUpdateData {
        eventType: 'ACCOUNT_UPDATE',
        eventTime: number,
        transactTime: number,
        updateData: {
            eventReasonType: FSWUserAccountUpdateEventReasonType,
            balances: FWSUserAccountUpdateBalance[],
            positions: FWSUserAccountUpdatePosition[]
        }
    }

    export interface FWSUserOrderUpdateData {
        eventType: 'ORDER_TRADE_UPDATE',
        eventTime: number,
        transactTime: number,
        order: FWSOrderUpdateOrder
    }

    export interface FWSOrderUpdateOrder {
        symbol: string,
        clientOrderId: string,
        side: FOrderSide,
        type: FOrderType
        timeInForce: FTimeInForce,
        origQty: string,
        origPrice: string,
        avgPrice: string,
        stopPrice: string,
        execType: FExecutionType,
        status: FOrderStatus,
        orderId: number,
        lastFilledQty: string,
        filledAccumulatedQty: string,
        lastFilledPrice: string,
        commissionAsset: string,
        commission: string,
        tradeTime: number,
        tradeId: number,
        bidNational: string,
        askNational: string,
        isMaker: boolean,
        isReduceOnly: boolean,
        stopPriceType: string // TODO: type
    }



    export enum FuturesApiReferralType {
        USDT = 1,
        Coin = 2,
    }

    export interface FuturesApiReferralResponse {
        brokerId: string;
        rebateWorking: boolean;
        ifNewUser: boolean;
    }

    export interface FuturesApiReferralOverviewResponse {
        brokerId: string; // "ABCD1234",
        newTraderRebateCommission: string; // "0.30000000",
        oldTraderRebateCommission: string; // "0.20000000",
        totalTradeUser: number; // 13,
        unit: string; // "USDT",
        totalTradeVol: string; // "405.54379000",
        totalRebateVol: string; // "0.01833800",
        time: number; //1597708800000
     }

    export interface Binance {
        // ________________________________________ Binance
        accountInfo(options?: { useServerTime: boolean }, agent?: Agent): Promise<Account>;
        tradeFee(agent?: Agent): Promise<TradeFeeResult>;
        trades(options: { symbol: string, limit?: number }, agent?: Agent): Promise<Trade[]>;
        aggTrades(options?: { symbol: string, fromId?: string, startTime?: number, endTime?: number, limit?: number }, agent?: Agent): Promise<AggregatedTrade[]>;
        allBookTickers(agent?: Agent): Promise<{ [key: string]: Ticker }>;
        book(options: { symbol: string, limit?: number }, agent?: Agent): Promise<OrderBook>;
        exchangeInfo(agent?: Agent): Promise<ExchangeInfo>;
        order(options: NewOrder, agent?: Agent): Promise<Order>;
        orderTest(options: NewOrder, agent?: Agent): Promise<Order>;
        ping(agent?: Agent): Promise<boolean>;
        prices(agent?: Agent): Promise<{ [index: string]: string }>;
        avgPrice(options?: { symbol: string }, agent?: Agent): Promise<AvgPriceResult | AvgPriceResult[]>;
        time(agent?: Agent): Promise<number>;
        ws: IBinanceWebSocket;
        fws: IFuturesWebSocket;
        myTrades(options: { symbol: string, limit?: number, fromId?: number, useServerTime?: boolean }, agent?: Agent): Promise<MyTrade[]>;
        getOrder(options: { symbol: string, orderId: number, origClientOrderId?: string, recvWindow?: number, useServerTime?: boolean }, agent?: Agent): Promise<QueryOrderResult>;
        cancelOrder(options: { symbol: string; orderId: number, origClientOrderId?: string, newClientOrderId?: string, recvWindow?: number, useServerTime?: boolean }, agent?: Agent): Promise<CancelOrderResult>;
        openOrders(options: { symbol?: string, recvWindow?: number, useServerTime?: boolean }, agent?: Agent): Promise<QueryOrderResult[]>;
        allOrders(options: { symbol?: string, orderId?: string, limit?: number, recvWindow?: number, useServerTime?: boolean }, agent?: Agent): Promise<QueryOrderResult[]>;
        dailyStats(options?: { symbol: string }, agent?: Agent): Promise<DailyStatsResult | DailyStatsResult[]>;
        candles(options: CandlesOptions, agent?: Agent): Promise<CandleChartResult[]>;
        tradesHistory(options: { symbol: string, limit?: number, fromId?: number }, agent?: Agent): Promise<Trade[]>;
        depositAddress(options: { asset: string }, agent?: Agent): Promise<DepositAddress>;
        withdraw(options: { asset: string, address: string, amount: number; name?: string }, agent?: Agent): Promise<WithrawResponse>;
        assetDetail(agent?: Agent): Promise<AssetDetail>;
        withdrawHistory(options: { asset: string, status?: number, startTime?: number, endTime?: number }, agent?: Agent): Promise<WithdrawHistoryResponse>;
        depositHistory(options: { asset: string, status?: number, startTime?: number, endTime?: number }, agent?: Agent): Promise<DepositHistoryResponse>;

        // _____________________________________ Binance futures
        futuresPing: (agent?: Agent) => Promise<true>;
        futuresTime: (agent?: Agent) => Promise<number>;
        futuresExchangeInfo: (agent?: Agent) => Promise<FExchangeInfo>;
        futuresBook: (payload: { symbol: string, limit?: number }, agent?: Agent) => Promise<FOrderBook>;
        futuresTrades: (payload: { symbol: string, limit?: number }, agent?: Agent) => Promise<FTrade[]>;
        futuresTradesHistory: (payload: { symbol: string, limit?: number, fromId?: number }, agent?: Agent) => Promise<FTrade[]>;
        futuresAggTrades: (payload: { symbol: string, fromId?: string, startTime?: number, endTime?: number, limit?: number }, agent?: Agent) => Promise<FAggregatedTrade[]>;
        futuresCandles: (payload: FCandlesOptions, agent?: Agent) => Promise<FCandleChartResult[]>;
        // ______________ futures exclusive
        futuresMarkPrice: (payload: { symbol?: string }, agent?: Agent) => Promise<FMarkPrice>;
        futuresFundingRate: (payload: { symbol?: string, startTime?: number, endTime?: number, limit?: number }, agent?: Agent) => Promise<FFundingRate>;
        futuresDailyStats: (payload: { symbol?: string }, agent?: Agent) => Promise<FDailyState>;
        futuresPrice: (payload: { symbol?: string, reduce?: boolean }, agent?: Agent) => Promise<FPrice | FPrice[] | FReducedPrice>;
        // TODO: Verify that adding reduce to the payload doesn't pose a problem
        // futuresAvgPrice: (payload: { symbol?: string }) => Promise<FMarkPrice>;
        futuresBookTicker: (payload: { symbol?: string, reduce?: boolean }, agent?: Agent) => Promise<FBookTicker | FBookTicker[] | FReducedBookTicker>;
        futuresAllForceOrders: (payload: { symbol?: string, startTime?: number, endTime?: number, limit?: number }, agent?: Agent) => Promise<FForceOrder | FForceOrder[]>;
        futuresOpenInterest: (payload: { symbol: string }, agent?: Agent) => Promise<FOpenInterest>;
        futuresLeverageBracket: (payload: { symbol?: string }, agent?: Agent) => Promise<FLeverageBrackets | FLeverageBrackets[] | FReducedLeverageBrackets>;
        futuresAccountTransfer: (payload: { asset: string, amount: number, type: number, recvWindow?: number }, agent?: Agent) => Promise<FAccountTransfer>;
        futuresAccountTransactionHistory: (payload: { asset: string, startTime: number, endTime?: number, current?: number, size?: number, recvWindow?: number }, agent?: Agent) => Promise<FAccountTransferHistory>;
        futuresOrder: (payload: FNewOrder, agent?: Agent) => Promise<FOrder>;
        futuresOrderTest: (payload: { symbol?: string }, agent?: Agent) => Promise<FMarkPrice>;
        futuresGetOrder: (payload: { symbol: string, orderId?: string, origClientOrderId?: string, recvWindow?: number }, agent?: Agent) => Promise<FOrderState>;
        futuresCancelOrder: (payload: { symbol: string, orderId?: string, origClientOrderId?: string, recvWindow?: number }, agent?: Agent) => Promise<FOrder>;
        futuresCancelAllOpenOrders: (payload: { symbol: string, recvWindow?: number }, agent?: Agent) => Promise<FCancelAllOrderResp>;
        futuresCancelMultipleOrders: (payload: { symbol: string, orderIdList?: string[], origClientOrderIdList?: string[], recvWindow?: number }, agent?: Agent) => Promise<(FOrder | FCancelAllOrderResp)[]>;
        futuresGetOpenOrder: (payload: { symbol: string, orderId?: string, origClientOrderId?: string, recvWindow?: number}, agent?: Agent) => Promise<FOrderState>;
        futuresGetAllOpenOrders: (payload: { symbol?: string, recvWindow?: number }, agent?: Agent) => Promise<FOrderState[]>;
        futuresGetAllOrders: (payload: { symbol: string, orderId?: string, startTime?: number, endTime?: number, limit?: number, recvWindow?: number }, agent?: Agent) => Promise<FOrderState[]>;
        futuresAccountBalance: (payload: { recvWindow?: number }, agent?: Agent) => Promise<FAccountBalance[]>;
        futuresAccountInfo: (payload: { recvWindow?: number }, agent?: Agent) => Promise<FAccountInfo>;
        futuresApiReferralIfNewUser: (payload: { recvWindow?: number, brokerId: string, type?: FuturesApiReferralType }, agent?: Agent) => Promise<FuturesApiReferralResponse>;
        futuresApiReferralOverview: (payload: { recvWindow?: number }, agent?: Agent) => Promise<FuturesApiReferralOverviewResponse>;
        futuresChangeLeverage: (payload: { symbol: string, leverage: number, recvWindow?: number }, agent?: Agent) => Promise<FLeverageChangeResp>;
        futuresChangeMarginType: (payload: { symbol: string, marginType: FMarginType, recvWindow?: number }, agent?: Agent) => Promise<CodeMsgResp>;
        futuresModifyPositionMargin: (payload: { symbol: string, amount: number, type: number, recvWindow?: number }, agent?: Agent) => Promise<FModifyPositionMarginResp>;
        futuresPositionMarginHistory: (payload: { symbol: string, type?: number, startTime?: number, endTime?: number, limit?: number, recvWindow?: number }, agent?: Agent) => Promise<FPositionMargin[]>;
        futuresPositionRisk: (payload: { recvWindow?: number }, agent?: Agent) => Promise<FPositionRisk[]>;
        futuresUserTrades: (payload: { symbol: string, startTime?: number, endTime?: number, fromId?: string, limit?: number, recvWindow?: number }, agent?: Agent) => Promise<FUserTrade[]>;
        futuresIncomeHistory: (payload: { symbol?: string, incomeType?: FIncomeType, startTime?: number, endTime?: number, limit?: number, revWindow?: number }, agent?: Agent) => Promise<FIncome[]>;
        futuresGetUserDataStream: (payload: {recvWindow?: number}, agent?: Agent) => Promise<{ listenKey: string}>;
        futuresKeepUserDataStream: (payload: {recvWindow?: number}, agent?: Agent) => Promise<{}>;
        futuresCloseUserDataStream: (payload: {recvWindow?: number}, agent?: Agent) => Promise<{}>;
    }

    export interface HttpError extends Error {
        code: number | string;
        message: string;
    }

    export interface IBinanceWebSocket {
        depth: (symbol: string | string[], callback: (depth: Depth) => void) => StreamReturnObj;
        partialDepth: (options: { symbol: string, level: number } | { symbol: string, level: number }[], callback: (depth: PartialDepth) => void) => StreamReturnObj;
        ticker: (symbol: string | string[], callback: (ticker: Ticker) => void) => StreamReturnObj;
        allTickers: (callback: (tickers: Ticker[]) => void) => StreamReturnObj;
        candles: (symbol: string | string[], interval: string, callback: (ticker: Candle) => void) => StreamReturnObj;
        trades: (symbols: string | string[], callback: (trade: WsTrade) => void) => StreamReturnObj;
        aggTrades: (symbols: string | string[], callback: (trade: WsAggregatedTrade) => void) => StreamReturnObj;
        user: (callback: (msg: OutboundAccountInfo | ExecutionReport) => void) => Promise<StreamReturnObj>;
    }

    export interface IFuturesWebSocket {
        depth: (payload: { symbol: string, speed?: string }, callback: (depth: FWsDepth) => void) => FStreamReturnObj;
        partialDepth: (payload: { symbol: string, speed?: string, level?: number }, callback: (depth: FWsPartialDepth) => void) => FStreamReturnObj;
        markPrice: (payload: { symbol: string, speed?: string }, callback: (markPrice: MarkPrice) => void) => FStreamReturnObj;
        markPriceAll: (payload: { speed?: string, reduce?: boolean }, callback: (markPrices: MarkPrice[] | ReducedMarkPrice) => void) => FStreamReturnObj;
        candles: (symbol: string, interval: string, callback: (candle: FWsCandle) => void) => FStreamReturnObj;
        trades: (symbols: string, callback: (trade: FWsTrade) => void) => FStreamReturnObj;
        aggTrades: (symbols: string, callback: (trade: FWsAggregatedTrade) => void) => FStreamReturnObj;
        ticker: (symbol: string | string[], callback: (ticker: FWsTicker) => void) => FStreamReturnObj;
        miniTicker: (symbol: string, callback: (miniTicker: FWsMiniTicker) => void) => FStreamReturnObj;
        allMiniTickers: (callback: (miniTickers: FWsMiniTicker[]) => void) => FStreamReturnObj;
        allTickers: (callback: (tickers: FWsTicker[]) => void) => FStreamReturnObj;
        bookTicker: (symbol: string, callback: (bookTicker: FWsBookTicker) => void) => FStreamReturnObj;
        allBookTicker: (callback: (bookTicker: FWsBookTicker) => void) => FStreamReturnObj;
        liquidationOrder: (symbol: string, callback: (liquidationOrder: FWsLiquidationOrder) => void) => FStreamReturnObj;
        allLiquidationOrder: (callback: (liquidationOrders: FWsLiquidationOrder[]) => void) => FStreamReturnObj;
        user: (callback: (msg: FWSUserOrderUpdateData | FWSUserAccountUpdateData | FWSUserMarginCallEventData | { eventType: string, [prop: string]: any }) => void) => Promise<FStreamReturnObj>;
        multiStreams: FMultiStreamsFactory
    }

    export type ReconnectingWebSocketHandler = (options?: {keepClosed: boolean, fastClose: boolean, delay: number}) => void

    export interface StreamReturnObj {
        closeStream: ReconnectingWebSocketHandler,
        ws: WebSocket | WebSocket[]
    }

    export interface FStreamReturnObj {
        closeStream: ReconnectingWebSocketHandler,
        ws: WebSocket
    }

    export enum CandleChartInterval {
        ONE_MINUTE = '1m',
        THREE_MINUTES = '3m',
        FIVE_MINUTES = '5m',
        FIFTEEN_MINUTES = '15m',
        THIRTY_MINUTES = '30m',
        ONE_HOUR = '1h',
        TWO_HOURS = '2h',
        FOUR_HOURS = '4h',
        SIX_HOURS = '6h',
        EIGHT_HOURS = '8h',
        TWELVE_HOURS = '12h',
        ONE_DAY = '1d',
        THREE_DAYS = '3d',
        ONE_WEEK = '1w',
        ONE_MONTH = '1M'
    }

    export type FCandleChartInterval = CandleChartInterval;

    export type RateLimitType =
        | 'REQUEST_WEIGHT'
        | 'ORDERS';

    export type FRateLimitType = RateLimitType;

    export type RateLimitInterval =
        | 'SECOND'
        | 'MINUTE'
        | 'DAY';

    export type FRateLimitInterval = RateLimitInterval;

    export interface ExchangeInfoRateLimit {
        rateLimitType: RateLimitType;
        interval: RateLimitInterval;
        intervalNum: number;
        limit: number;
    }

    export interface FExchangeInfoRateLimit {
        rateLimitType: FRateLimitType;
        interval: FRateLimitInterval;
        intervalNum: number;
        limit: number;
    }

    export type ExchangeFilterType =
        | 'EXCHANGE_MAX_NUM_ORDERS'
        | 'EXCHANGE_MAX_ALGO_ORDERS';

    export interface ExchangeFilter {
        filterType: ExchangeFilterType;
        limit: number;
    }

    export interface FExchangeFilter {
        filterType: FFilterType,
        // ________ PRICE_FILTER
        minPrice?: number,
        maxPrice?: number,
        tickSize?: number,
        // ________ LOT_SIZE, MARKET_LOT_SIZE
        minQty?: number,
        maxQty?: number,
        stepSize?: number,
        // ________ MAX_NUM_ORDERS
        limit?: number,
        // ________ PERCENT_PRICE
        multiplierUp?: number,
        multiplierDown?: number,
        multiplierDecimal?: number
    }

    export type FFilterType =
        | 'PRICE_FILTER'
        | 'LOT_SIZE'
        | 'MARKET_LOT_SIZE'
        | 'MAX_NUM_ORDERS'
        | 'PERCENT_PRICE';

    export type SymbolFilterType =
        | 'PRICE_FILTER'
        | 'PERCENT_PRICE'
        | 'LOT_SIZE'
        | 'MIN_NOTIONAL'
        | 'MAX_NUM_ORDERS'
        | 'MAX_ALGO_ORDERS';

    export interface SymbolPriceFilter {
        filterType: Extract<FFilterType, 'PRICE_FILTER'>,
        minPrice: string;
        maxPrice: string;
        tickSize: string;
    }

    export interface SymbolPercentPriceFilter {
        filterType: Extract<FFilterType, 'PERCENT_PRICE'>,
        multiplierDown: string;
        multiplierUp: string;
        avgPriceMins: number;
    }

    export interface SymbolLotSizeFilter {
        filterType: Extract<FFilterType, 'LOT_SIZE' | 'MARKET_LOT_SIZE'>,
        minQty: string;
        maxQty: string;
        stepSize: string;
    }

    export interface SymbolMinNotionalFilter {
        applyToMarket: boolean;
        avgPriceMins: number;
        filterType: Extract<FFilterType, 'MIN_NOTIONAL'>,
        minNotional: string;
    }

    export interface SymbolMaxNumOrdersFilter {
        filterType: Extract<FFilterType, 'MAX_NUM_ORDERS'>,
        limit: number;
    }

    export interface SymbolMaxAlgoOrdersFilter {
        filterType: Extract<FFilterType, 'MAX_ALGO_ORDERS'>,
        limit: number;
    }

    export type SymbolFilter =
        | SymbolPriceFilter
        | SymbolPercentPriceFilter
        | SymbolLotSizeFilter
        | SymbolMinNotionalFilter
        | SymbolMaxNumOrdersFilter
        | SymbolMaxAlgoOrdersFilter;

    export type FSymbolFilter = SymbolFilter;

    export interface Symbol {
        symbol: string;
        status: string;
        baseAsset: string;
        baseAssetPrecision: number;
        quoteAsset: string;
        quotePrecision: number;
        orderTypes: OrderType[];
        icebergAllowed: boolean;
        filters: SymbolFilter[];
    }

    export interface FSymbol {
        filters: FSymbolFilter[],
        maintMarginPercent: string,
        pricePrecision: number,
        quantityPrecision: number,
        requiredMarginPercent: string,
        status: 'TRADING',
        OrderType: FOrderType,
        symbol: string,
        timeInForce: FTimeInForce,
        baseAsset: string,
        quoteAsset: string,
        marginAsset: string,
    }

    export interface ExchangeInfo {
        timezone: string;
        serverTime: number;
        rateLimits: ExchangeInfoRateLimit[];
        exchangeFilters: ExchangeFilter[];
        symbols: Symbol[];
    }

    export interface FExchangeInfo {
        timezone: string;
        serverTime: number;
        rateLimits: FExchangeInfoRateLimit[];
        exchangeFilters: FExchangeFilter[];
        symbols: FSymbol[];
    }

    export interface OrderBook {
        lastUpdateId: number;
        asks: Bid[];
        bids: Bid[];
    }

    export type FOrderBook = OrderBook;

    export interface NewOrder {
        icebergQty?: string;
        newClientOrderId?: string;
        price?: string;
        quantity: string;
        recvWindow?: number;
        side: OrderSide;
        stopPrice?: string;
        symbol: string;
        timeInForce?: TimeInForce;
        useServerTime?: boolean;
        type: OrderType;
        newOrderRespType?: NewOrderRespType;
    }

    interface OrderFill {
        price: string;
        quantity: string;
        commission: string;
        commissionAsset: string;
    }

    interface Order {
        clientOrderId: string;
        executedQty: string;
        icebergQty?: string;
        orderId: number;
        origQty: string;
        price: string;
        side: OrderSide;
        status: OrderStatus;
        stopPrice?: string;
        symbol: string;
        timeInForce: TimeInForce;
        transactTime: number;
        type: OrderType;
        fills?: OrderFill[];
    }

    interface FOrder {
        clientOrderId: string;
        executedQty: string;
        orderId: number;
        origQty: string;
        price: string;
        reduceOnly: boolean;
        side: FOrderSide;
        status: FOrderStatus;
        stopPrice?: string;
        symbol: string;
        timeInForce: FTimeInForce;
        type: FOrderType;
        activatePrice: string,
        priceRate: string,
        updateTime: number,
        workingType: FOrderWorkingType;
    }

    export type FNewOrder = {
        symbol: string,
        side: FOrderSide,
        type: FOrderType,
        timeInForce?: FTimeInForce,
        price?: string,
        newClientOrderId?: string,
        stopPrice?: string,
        activationPrice?: string,
        callbackRate?: number,
        workingType?: FOrderWorkingType,
        recvWindow?: number
    } & ({
        reduceOnly?: "true" | "false",
        quantity: string,
    } | {
        type: Extract<FOrderType, 'STOP_MARKET' | 'TAKE_PROFIT_MARKET'>,
        closePosition?: "true" | "false",
    })

    export interface FOrderState {
        avgPrice: string,
        clientOrderId: string;
        executedQty: string;
        orderId: number;
        origQty: string;
        origType: FOrderType,
        price: string;
        reduceOnly: boolean;
        side: FOrderSide;
        status: FOrderStatus;
        stopPrice?: string;
        symbol: string;
        time: number,
        timeInForce: FTimeInForce;
        type: FOrderType;
        activatePrice: string,
        priceRate: string,
        updateTime: number,
        workingType: FOrderWorkingType;
    }

    interface FCancelAllOrderResp {
        code: string,
        msg: string
    }

    interface FAccountBalance {
        accountAlias: string, // unique account code
        asset: string,
        balance: string,
        crossWalletBalance: string,
        crossUnPnl: string,
        availableBalance: string,
        maxWithdrawAmount: string
    }

    interface FAccountInfo {
        feeTier: number,
        canTrade: boolean,
        canDeposit: boolean,
        canWithdraw: boolean,
        updateTime: number
        totalInitialMargin: string,
        totalMaintMargin: string,
        totalWalletBalance: string,
        totalUnrealizedProfit: string,
        totalMarginBalance: string,
        totalPositionInitialMargin: string,
        totalOpenOrderInitialMargin: string,
        totalCrossWalletBalance: string,
        totalCrossUnPnl: string,
        availableBalance: string,
        maxWithdrawAmount: string,
        assets: FAssetAccountInfo[],
        positions: FPositionAccountInfo[],
    }

    interface FAssetAccountInfo {
        asset: string,
        walletBalance: string
        unrealizedProfit: string,
        marginBalance: string,
        maintMargin: string,
        initialMargin: string,
        positionInitialMargin: string,
        openOrderInitialMargin: string,
        crossWalletBalance: string,
        crossUnPnl: string,
        availableBalance: string,
        maxWithdrawAmount: string,
    }

    interface FPositionAccountInfo {
        symbol: string,
        initialMargin: string,
        maintMargin: string,
        unrealizedProfit: string
        positionInitialMargin: string,
        openOrderInitialMargin: string,
        leverage: string,
        isolated: boolean,
        entryPrice: string,
        maxNational: string,
        positionSide: FPositionSide,
        positionAmt: string,
    }

    export type FPositionSide = 'BOTH'
        | 'LONG'
        | 'SHORT';

    export interface FLeverageChangeResp {
        leverage: number,
        maxNotionalValue: string,
        symbol: string
    }

    export interface CodeMsgResp {
        code: string,
        msg: string
    }

    export type FMarginType =
        | 'ISOLATED'
        | 'CROSSED';

    export interface FModifyPositionMarginResp {
        amount: number,
        code: number,
        msg: string,
        type: number
    }

    export interface FPositionMargin {
        amount: string,
        asset: string,
        symbol: string,
        time: number,
        type: number
    }

    export interface FPositionRisk {
        entryPrice: string,
        marginType: string,
        isAutoAddMargin: string,
        isolatedMargin: string,
        leverage: string,         // current initial leverage
        liquidationPrice: string,
        markPrice: string,
        maxNotionalValue: string, // notional value limit of current initial leverage
        positionAmt: string,      // Positive for long, negative for short
        symbol: string,
        unRealizedProfit: string;
        positionSide: FPositionSide;
    }

    export interface FUserTrade {
        buyer: boolean,
        commission: string,
        commissionAsset: string,
        id: number,
        maker: boolean,
        orderId: number,
        price: string,
        qty: string,
        quoteQty: string,
        realizedPnl: string,
        side: string,
        symbol: string,
        time: number
    }

    interface FIncome {
        symbol: string,
        incomeType: string,
        income: string,
        asset: string,
        info: string,
        time: number
    }

    type FIncomeType =
        | 'TRANSFER'
        | 'WELCOME_BONUS'
        | 'REALIZED_PNL'
        | 'FUNDING_FEE'
        | 'COMMISSION'
        | 'INSURANCE_CLEAR';


    export type OrderSide = 'BUY' | 'SELL';
    export type FOrderSide = OrderSide;

    export type OrderStatus =
        | 'CANCELED'
        | 'EXPIRED'
        | 'FILLED'
        | 'NEW'
        | 'PARTIALLY_FILLED'
        | 'PENDING_CANCEL'
        | 'REJECTED';

    export type FOrderStatus =
        | 'NEW'
        | 'PARTIALLY_FILLED'
        | 'FILLED'
        | 'CANCELED'
        | 'REJECTED'
        | 'EXPIRED';

    export type OrderType =
        | 'LIMIT'
        | 'LIMIT_MAKER'
        | 'MARKET'
        | 'STOP_LOSS'
        | 'STOP_LOSS_LIMIT'
        | 'TAKE_PROFIT'
        | 'TAKE_PROFIT_LIMIT';

    export type FOrderType =
        | 'LIMIT'
        | 'MARKET'
        | 'STOP'
        | 'STOP_MARKET'
        | 'TAKE_PROFIT'
        | 'TAKE_PROFIT_MARKET'
        | 'TRAILING_STOP_MARKET';

    export type FOrderWorkingType =
        | 'MARK_PRICE'
        | 'CONTRACT_PRICE';

    export type NewOrderRespType = 'ACK' | 'RESULT' | 'FULL';

    export type TimeInForce = 'GTC' | 'IOC' | 'FOK';
    export type FTimeInForce = 'GTC' | 'IOC' | 'FOK' | 'GTX';

    export type ExecutionType =
        | 'NEW'
        | 'CANCELED'
        | 'REPLACED'
        | 'REJECTED'
        | 'TRADE'
        | 'EXPIRED';
    export type FExecutionType =
        | 'NEW'
        | 'PARTIAL_FILL'
        | 'FILL'
        | 'CANCELED'
        | 'CALCULATED' //  Liquidation Execution
        | 'EXPIRED'
        | 'TRADE';
    export type EventType =
        | 'executionReport'
        | 'account';

    interface Depth {
        eventType: string;
        eventTime: number;
        symbol: string;
        firstUpdateId: number;
        finalUpdateId: number;
        bidDepth: BidDepth[];
        askDepth: BidDepth[];
    }

    interface FWsDepth {
        eventType: string;
        eventTime: number;
        symbol: string;
        firstUpdateId: number;
        finalUpdateId: number;
        transactionTime: number,
        lastUpdateIdInLastStream: number,
        bidDepth: BidDepth[];
        askDepth: BidDepth[];
    }

    interface BidDepth {
        price: string;
        quantity: string;
    }

    interface PartialDepth {
        symbol: string;
        level: number;
        bids: Bid[];
        asks: Bid[];
    }

    interface FWsPartialDepth {
        eventType: string,
        eventTime: number,
        symbol: string,
        firstUpdateId: number,
        finalUpdateId: number,
        transactionTime: number,
        lastUpdateIdInLastStream: number,
        bidDepth: BidDepth[]
        askDepth: BidDepth[]
    }

    interface MarkPrice {
        eventType: string,
        eventTime: number,
        symbol: string,
        markPrice: string,
        fundingRate: string,
        nextFundingTime: number
    }

    interface ReducedMarkPrice {
        [symbol: string]: MarkPrice
    }

    interface Bid {
        price: string;
        quantity: string;
    }

    interface Ticker {
        eventType: string;
        eventTime: number;
        symbol: string;
        priceChange: string;
        priceChangePercent: string;
        weightedAvg: string;
        prevDayClose: string;
        curDayClose: string;
        closeTradeQuantity: string;
        bestBid: string;
        bestBidQnt: string;
        bestAsk: string;
        bestAskQnt: string;
        open: string;
        high: string;
        low: string;
        volume: string;
        volumeQuote: string;
        openTime: number;
        closeTime: number;
        firstTradeId: number;
        lastTradeId: number;
        totalTrades: number;
    }

    interface FWsTicker {
        eventType: string;
        eventTime: number;
        symbol: string;
        priceChange: string;
        priceChangePercent: string;
        weightedAvgPrice: string;
        lastPrice: string,
        lastQuantity: string,
        open: string;
        high: string;
        low: string;
        volume: string;
        volumeQuote: string;
        openTime: number;
        closeTime: number;
        firstTradeId: number;
        lastTradeId: number;
        totalTrades: number;
    }

    interface FWsMiniTicker {
        eventType: number,
        eventTime: number,
        symbol: string,
        close: string,
        open: string,
        high: string,
        low: string,
        volume: string,
        quoteVolume: string
    }

    interface FWsBookTicker {
        updateId: number
        bestBidPrice: string,
        bestBidQty: string,
        bestAskPrice: string,
        bestAskQty: string
        symbol: string,
        eventTime: number,
        transactionTime: number,
    }

    interface Candle {
        eventType: string;
        eventTime: number;
        symbol: string;
        startTime: number;
        closeTime: number;
        firstTradeId: number;
        lastTradeId: number;
        open: string;
        high: string;
        low: string;
        close: string;
        volume: string;
        trades: number;
        interval: string;
        isFinal: boolean;
        quoteAssetVolume: string,
        buyAssetVolume: string,
        quoteBuyAssetVolume: string
    }

    type FWsCandle = Candle;

    interface FWsLiquidationOrder {
        eventType: string,
        eventTime: number,
        order: FLiquidationOrderObj
    }

    interface FLiquidationOrderObj {
        symbol: string,
        side: string,
        orderType: string,
        timeInForce: string,
        quantity: string,
        price: string,
        averagePrice: string,
        status: string,
        lastFilledQuantity: string,
        filledAccumulatedQuantity: string,
        tradeTime: number
    }


    interface Message {
        eventType: EventType;
        eventTime: number;
    }

    interface Balances {
        [key: string]: {
            available: string;
            locked: string;
        }
    }

    interface OutboundAccountInfo extends Message {
        balances: Balances;
        makerCommissionRate: number;
        takerCommissionRate: number;
        buyerCommissionRate: number;
        sellerCommissionRate: number;
        canTrade: boolean;
        canWithdraw: boolean;
        canDeposit: boolean;
        lastAccountUpdate: number;
    }

    interface ExecutionReport extends Message {
        symbol: string;
        newClientOrderId: string;
        originalClientOrderId: string;
        side: OrderSide;
        orderType: OrderType;
        timeInForce: TimeInForce;
        quantity: string;
        price: string;
        executionType: ExecutionType;
        stopPrice: string;
        icebergQuantity: string;
        orderStatus: OrderStatus;
        orderRejectReason: string;
        orderId: number;
        orderTime: number;
        lastTradeQuantity: string;
        totalTradeQuantity: string;
        priceLastTrade: string;
        commission: string;
        commissionAsset: string;
        tradeId: number;
        isOrderWorking: boolean;
        isBuyerMaker: boolean;
    }

    export interface TradeResult {
        id: number;
        price: string;
        quantity: string;
        time: number;
        isBuyerMaker: boolean;
        isBestMatch: boolean;
    }



    interface MyTrade {
        id: number;
        orderId: number;
        orderListId: number;
        price: string;
        quantity: string;
        quoteQty: string;
        commission: string;
        commissionAsset: string;
        time: number;
        isBuyer: boolean;
        isMaker: boolean;
        isBestMatch: boolean;
    }

    interface QueryOrderResult {
        clientOrderId: string;
        cummulativeQuoteQty: string,
        executedQty: string;
        icebergQty: string;
        isWorking: boolean;
        orderId: number;
        origQty: string;
        price: string;
        side: OrderSide;
        status: OrderStatus;
        stopPrice: string;
        symbol: string;
        time: number;
        timeInForce: TimeInForce;
        type: string;
        updateTime: number;
    }

    interface CancelOrderResult {
        symbol: string;
        origClientOrderId: string;
        orderId: number;
        clientOrderId: string;
    }

    export interface AvgPriceResult {
        mins: number;
        price: string;
    }

    export interface DailyStatsResult {
        symbol: string;
        priceChange: string;
        priceChangePercent: string;
        weightedAvgPrice: string;
        prevClosePrice: string;
        lastPrice: string;
        lastQty: string;
        bidPrice: string;
        bidQty: string;
        askPrice: string;
        askQty: string;
        openPrice: string;
        highPrice: string;
        lowPrice: string;
        volume: string;
        quoteVolume: string;
        openTime: number;
        closeTime: number;
        firstId: number; // First tradeId
        lastId: number; // Last tradeId
        count: number; // Trade count
    }

    export interface CandlesOptions {
        symbol: string;
        interval: CandleChartInterval;
        limit?: number;
        startTime?: number;
        endTime?: number;
    }

    export interface FCandlesOptions {
        symbol: string;
        interval: FCandleChartInterval;
        limit?: number;
        startTime?: number;
        endTime?: number;
    }

    export interface CandleChartResult {
        openTime: number;
        open: string;
        high: string;
        low: string;
        close: string;
        volume: string;
        closeTime: number;
        quoteVolume: string;
        trades: number;
        quoteAssetVolume: string;
        buyBaseAssetVolume: string;
        buyQuoteAssetVolume: string;
    }

    export type FCandleChartResult = CandleChartResult;

    interface WsTrade {
        eventType: string;
        eventTime: number;
        symbol: string;
        tradeId: number;
        price: string;
        quantity: string;
        // buyerOrderId: number;
        // sellerOrderId: number; // TODO: check if exists
        tradeTime: number;
        isBuyerMaker: boolean;
        isBestMatch: boolean;
    }

    interface FWsTrade {
        eventType: string;
        eventTime: number;
        symbol: string;
        tradeId: number;
        price: string;
        quantity: string;
        tradeTime: number;
        isBuyerMaker: boolean;
    }

    interface WsAggregatedTrade {
        eventType: string;
        eventTime: number;
        symbol: string;
        aggId: number;
        price: string;
        quantity: string;
        firstTradeId: number;
        lastTradeId: number;
        tradeTime: number;
        isBuyerMaker: boolean;
        isBestMatch: boolean; // TODO: check (remove)
    }

    interface FWsAggregatedTrade {
        eventType: string;
        eventTime: number;
        symbol: string;
        aggId: number;
        price: string;
        quantity: string;
        firstTradeId: number;
        lastTradeId: number;
        tradeTime: number;
        isBuyerMaker: boolean;
    }

    type FMultiStreamsFactory = (
        symbolMethodObj: FMS_SymbolMethodObj | FMS_SymbolMethodObj[],
        callback: (data: any) => void // TODO: data type
    ) => FMultiStreamManager

    interface FMS_SymbolMethodObj {
        symbol: string,
        endPoint: string
    }

    interface FMultiStreamManager {
        ws: any // TODO: type
        subscribe: (symbolMethodObj: FMS_SymbolMethodObj | FMS_SymbolMethodObj[]) => void,
        unsubscribe: (symbolMethodObj: FMS_SymbolMethodObj | FMS_SymbolMethodObj[]) => void,
        close: ReconnectingWebSocketHandler
    }
}