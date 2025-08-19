import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card } from "@/components/ui/card";
import { CreditCardIcon, CoinsIcon, ArrowLeftRightIcon } from "lucide-react";

interface GetBriksModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function GetBriksModal({ isOpen, onClose }: GetBriksModalProps) {
  const [amount, setAmount] = useState("1000");

  const calculateTotal = () => {
    const briksAmount = Number(amount || 0);
    const exchangeRate = 0.15;
    const processingFee = 2.50;
    return (briksAmount * exchangeRate + processingFee).toFixed(2);
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent id="get-briks-modal" className="max-w-4xl max-h-[90vh] overflow-auto">
        <DialogHeader>
          <DialogTitle className="font-display text-2xl font-bold text-monopoly-dark">
            Get $BRIKS Tokens
          </DialogTitle>
        </DialogHeader>

        <Tabs defaultValue="credit-card" className="w-full">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="credit-card" className="flex items-center">
              <CreditCardIcon className="w-4 h-4 mr-2" />
              Credit Card
            </TabsTrigger>
            <TabsTrigger value="crypto" className="flex items-center">
              <CoinsIcon className="w-4 h-4 mr-2" />
              Crypto Swap
            </TabsTrigger>
            <TabsTrigger value="dex" className="flex items-center">
              <ArrowLeftRightIcon className="w-4 h-4 mr-2" />
              DEX
            </TabsTrigger>
          </TabsList>

          <TabsContent value="credit-card" className="mt-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <div>
                <h3 className="font-bold text-lg text-monopoly-dark mb-4">Purchase $BRIKS with Credit Card</h3>
                <form className="space-y-4">
                  <div>
                    <Label htmlFor="amount">Amount to Purchase</Label>
                    <div className="relative">
                      <Input
                        id="amount"
                        type="number"
                        value={amount}
                        onChange={(e) => setAmount(e.target.value)}
                        placeholder="1000"
                        className="pr-16"
                      />
                      <span className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500">$BRIKS</span>
                    </div>
                  </div>
                  <div>
                    <Label htmlFor="cardNumber">Card Number</Label>
                    <Input
                      id="cardNumber"
                      type="text"
                      placeholder="1234 5678 9012 3456"
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="expiry">Expiry Date</Label>
                      <Input
                        id="expiry"
                        type="text"
                        placeholder="MM/YY"
                      />
                    </div>
                    <div>
                      <Label htmlFor="cvv">CVV</Label>
                      <Input
                        id="cvv"
                        type="text"
                        placeholder="123"
                      />
                    </div>
                  </div>
                  <Button className="w-full bg-monopoly-red hover:bg-red-700 text-white font-bold py-3">
                    Purchase $BRIKS
                  </Button>
                </form>
              </div>
              <Card className="bg-monopoly-cream p-6">
                <h4 className="font-bold text-monopoly-dark mb-4">Transaction Summary</h4>
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span>$BRIKS Amount:</span>
                    <span className="font-bold">B {Number(amount || 0).toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Exchange Rate:</span>
                    <span>1 $BRIK = $0.15</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Processing Fee:</span>
                    <span>$2.50</span>
                  </div>
                  <hr className="border-gray-300" />
                  <div className="flex justify-between font-bold text-lg">
                    <span>Total:</span>
                    <span>${calculateTotal()}</span>
                  </div>
                </div>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="crypto" className="mt-6">
            <div className="text-center py-12">
              <CoinsIcon className="w-24 h-24 text-monopoly-gold mx-auto mb-4" />
              <h3 className="font-bold text-xl text-monopoly-dark mb-2">Crypto Swap Integration</h3>
              <p className="text-gray-600 mb-6">Connect your crypto wallet to swap tokens for $BRIKS</p>
              <Button className="bg-monopoly-gold hover:bg-yellow-500 text-monopoly-dark font-bold px-8 py-3">
                Coming Soon
              </Button>
            </div>
          </TabsContent>

          <TabsContent value="dex" className="mt-6">
            <div className="text-center py-12">
              <ArrowLeftRightIcon className="w-24 h-24 text-monopoly-green mx-auto mb-4" />
              <h3 className="font-bold text-xl text-monopoly-dark mb-2">Decentralized Exchange</h3>
              <p className="text-gray-600 mb-6">Trade $BRIKS on decentralized exchanges with optimal liquidity</p>
              <Button className="bg-monopoly-green hover:bg-green-700 text-white font-bold px-8 py-3">
                Coming Soon
              </Button>
            </div>
          </TabsContent>
        </Tabs>
      </DialogContent>
    </Dialog>
  );
}
